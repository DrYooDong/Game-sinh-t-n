# PowerShell Asset Synchronizer for PvZ GOTY
Add-Type -AssemblyName System.Drawing

$srcImg = "d:\Games\Game sinh tồn\reference\extracted_pak\images"
$srcReanim = "d:\Games\Game sinh tồn\reference\extracted_pak\reanim"
$dstBase = "d:\Games\Game sinh tồn\public\pvz_assets"

$lawnsDir = Join-Path $dstBase "lawns"
$projDir = Join-Path $dstBase "projectiles"
$plantsDir = Join-Path $dstBase "plants"
$zombiesDir = Join-Path $dstBase "zombies"
$uiDir = Join-Path $dstBase "ui"

$dirs = @($lawnsDir, $projDir, $plantsDir, $zombiesDir, $uiDir)
foreach ($d in $dirs) {
    if (-not (Test-Path $d)) {
        New-Item -ItemType Directory -Force -Path $d | Out-Null
    }
}

Write-Host "=========================================="
Write-Host "  1. SYNCHRONIZING LAWN BACKGROUNDS"
Write-Host "=========================================="

function Convert-LawnImage($srcFile, $dstFile) {
    $srcPath = Join-Path $srcImg $srcFile
    $dstPath = Join-Path $lawnsDir $dstFile
    if (Test-Path $srcPath) {
        $img = [System.Drawing.Image]::FromFile($srcPath)
        $bmp = New-Object System.Drawing.Bitmap $img.Width, $img.Height
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
        $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()
        Write-Host " [Lawn] Exported -> $dstFile ($($img.Width)x$($img.Height))"
    } else {
        Write-Warning "Missing $srcFile"
    }
}

Convert-LawnImage "background1.jpg" "frontyard_day.png"
Convert-LawnImage "background2.jpg" "dark.png"
Convert-LawnImage "background3.jpg" "beach.png"
Convert-LawnImage "background3.jpg" "pool.png"
Convert-LawnImage "background4.jpg" "pool_night.png"
Convert-LawnImage "background5.jpg" "roof.png"
Convert-LawnImage "background6boss.jpg" "boss.png"

Write-Host "`n=========================================="
Write-Host "  2. SYNCHRONIZING PROJECTILES & MOWER"
Write-Host "=========================================="

function Export-ScaledPng($srcPath, $dstPath, [int]$targetW, [int]$targetH) {
    if (Test-Path $srcPath) {
        $img = [System.Drawing.Image]::FromFile($srcPath)
        $w = if ($targetW -gt 0) { $targetW } else { $img.Width }
        $h = if ($targetH -gt 0) { $targetH } else { $img.Height }
        $bmp = New-Object System.Drawing.Bitmap $w, $h
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $w, $h)
        $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()
        Write-Host " [Proj] Exported -> $(Split-Path $dstPath -Leaf) ($w x $h)"
    }
}

Export-ScaledPng (Join-Path $srcImg "ProjectilePea.png") (Join-Path $projDir "pea.png") 48 48
Export-ScaledPng (Join-Path $srcImg "ProjectileSnowPea.png") (Join-Path $projDir "pea_ice.png") 48 48
Export-ScaledPng (Join-Path $srcImg "Projectile_star.png") (Join-Path $projDir "star.png") 48 48
Export-ScaledPng (Join-Path $srcImg "ProjectileCactus.png") (Join-Path $projDir "cactus.png") 40 24

# Melons and butter
$melonSrc = Join-Path $srcReanim "Melonpult_melon.png"
if (Test-Path $melonSrc) {
    Export-ScaledPng $melonSrc (Join-Path $projDir "melon.png") 56 56
}
$winterMelonSrc = Join-Path $srcReanim "WinterMelon_projectile.png"
if (Test-Path $winterMelonSrc) {
    Export-ScaledPng $winterMelonSrc (Join-Path $projDir "melon_ice.png") 56 56
}
$butterSrc = Join-Path $srcReanim "Cornpult_butter.png"
if (Test-Path $butterSrc) {
    Export-ScaledPng $butterSrc (Join-Path $projDir "butter.png") 48 48
}
$cabbageSrc = Join-Path $srcReanim "Cabbagepult_cabbage.png"
if (Test-Path $cabbageSrc) {
    Export-ScaledPng $cabbageSrc (Join-Path $projDir "cabbage.png") 48 48
}

# LawnMower
$mowerFiles = Get-ChildItem -Path $srcReanim -Filter "LawnMower*.png"
if ($mowerFiles.Count -gt 0) {
    Export-ScaledPng $mowerFiles[0].FullName (Join-Path $projDir "mower.png") 80 65
}

Write-Host "`n=========================================="
Write-Host "  3. COMPOSITING & SYNCHRONIZING PLANTS"
Write-Host "=========================================="

function Build-CompositePlant($outputName, $layers, [int]$canvasW = 120, [int]$canvasH = 120) {
    $dstPath = Join-Path $plantsDir $outputName
    $bmp = New-Object System.Drawing.Bitmap $canvasW, $canvasH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    foreach ($layer in $layers) {
        $filePath = Join-Path $srcReanim $layer.file
        if (-not (Test-Path $filePath)) {
            $filePath = Join-Path $srcImg $layer.file
        }
        if (Test-Path $filePath) {
            $img = [System.Drawing.Image]::FromFile($filePath)
            $w = if ($layer.w) { $layer.w } else { $img.Width }
            $h = if ($layer.h) { $layer.h } else { $img.Height }
            $x = if ($layer.x -ne $null) { $layer.x } else { [int](($canvasW - $w) / 2) }
            $y = if ($layer.y -ne $null) { $layer.y } else { [int](($canvasH - $h) / 2) }
            $g.DrawImage($img, $x, $y, $w, $h)
            $img.Dispose()
        }
    }

    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host " [Plant] Built -> $outputName"
}

# 1. Peashooter
Build-CompositePlant "plant_peashooter.png" @(
    @{ file="PeaShooter_backleaf.png"; x=10; y=70; w=45; h=35 },
    @{ file="PeaShooter_frontleaf.png"; x=60; y=70; w=45; h=35 },
    @{ file="PeaShooter_head.png"; x=20; y=15; w=80; h=80 }
) 120 120

# 2. Sunflower
Build-CompositePlant "plant_sunflower.png" @(
    @{ file="SunFlower_bottompetals.png"; x=15; y=15; w=90; h=90 },
    @{ file="SunFlower_head.png"; x=25; y=25; w=70; h=70 }
) 120 120

# 3. Twin Sunflower
Build-CompositePlant "plant_twin_sunflower.png" @(
    @{ file="SunFlower_double_petals.png"; x=10; y=10; w=100; h=100 },
    @{ file="TwinSunflower_leaf.png"; x=20; y=65; w=80; h=45 },
    @{ file="SunFlower_head.png"; x=25; y=20; w=70; h=70 }
) 120 120

# 4. Snow Pea
Build-CompositePlant "plant_snow_pea.png" @(
    @{ file="PeaShooter_backleaf.png"; x=10; y=70; w=45; h=35 },
    @{ file="PeaShooter_frontleaf.png"; x=60; y=70; w=45; h=35 },
    @{ file="SnowPea_crystals1.png"; x=15; y=10; w=45; h=45 },
    @{ file="SnowPea_head.png"; x=20; y=15; w=80; h=80 }
) 120 120

# 5. Repeater
Build-CompositePlant "plant_repeater.png" @(
    @{ file="PeaShooter_backleaf.png"; x=10; y=70; w=45; h=35 },
    @{ file="PeaShooter_frontleaf.png"; x=60; y=70; w=45; h=35 },
    @{ file="PeaShooter_eyebrow.png"; x=15; y=10; w=35; h=35 },
    @{ file="PeaShooter_head.png"; x=20; y=15; w=80; h=80 }
) 120 120

# 6. Gatling Pea
Build-CompositePlant "plant_gatling_pea.png" @(
    @{ file="PeaShooter_backleaf.png"; x=10; y=70; w=45; h=35 },
    @{ file="PeaShooter_frontleaf.png"; x=60; y=70; w=45; h=35 },
    @{ file="GatlingPea_head.png"; x=20; y=15; w=80; h=80 },
    @{ file="GatlingPea_helmet.png"; x=25; y=8; w=75; h=55 },
    @{ file="GatlingPea_barrel.png"; x=70; y=35; w=45; h=35 }
) 120 120

# 7. Chomper
Build-CompositePlant "plant_chomper.png" @(
    @{ file="Chomper_groundleaf1.png"; x=10; y=70; w=40; h=35 },
    @{ file="Chomper_groundleaf2.png"; x=70; y=70; w=40; h=35 },
    @{ file="Chomper_Headleaf1.png"; x=25; y=5; w=40; h=40 },
    @{ file="Chomper_head.png"; x=15; y=15; w=90; h=80 },
    @{ file="Chomper_bottomlip.png"; x=20; y=50; w=80; h=50 }
) 120 120

# 8. Squash
Build-CompositePlant "plant_squash.png" @(
    @{ file="Squash_body.png"; x=15; y=15; w=90; h=95 },
    @{ file="Squash_eyes.png"; x=30; y=35; w=60; h=35 },
    @{ file="Squash_eyebrows.png"; x=25; y=25; w=70; h=30 },
    @{ file="Squash_stem.png"; x=50; y=5; w=20; h=25 }
) 120 120

# 9. Cherry Bomb
Build-CompositePlant "plant_cherry_bomb.png" @(
    @{ file="CherryBomb_leaf1.png"; x=35; y=5; w=50; h=40 },
    @{ file="CherryBomb_left1.png"; x=10; y=35; w=55; h=55 },
    @{ file="CherryBomb_right1.png"; x=55; y=35; w=55; h=55 }
) 120 120

# 10. Jalapeno
Build-CompositePlant "plant_jalapeno.png" @(
    @{ file="Jalapeno_body.png"; x=25; y=15; w=70; h=95 },
    @{ file="Jalapeno_eye1.png"; x=35; y=35; w=25; h=25 },
    @{ file="Jalapeno_eye2.png"; x=60; y=35; w=25; h=25 },
    @{ file="Jalapeno_eyebrow1.png"; x=30; y=28; w=30; h=18 },
    @{ file="Jalapeno_eyebrow2.png"; x=58; y=28; w=30; h=18 },
    @{ file="Jalapeno_mouth.png"; x=40; y=58; w=40; h=25 }
) 120 120

# 11. Spikeweed
Build-CompositePlant "plant_spikeweed.png" @(
    @{ file="Caltrop_body.png"; x=15; y=25; w=90; h=70 },
    @{ file="Caltrop_horn1.png"; x=10; y=10; w=35; h=45 },
    @{ file="Caltrop_horn2.png"; x=75; y=10; w=35; h=45 }
) 120 120

# 12. Torchwood
Build-CompositePlant "plant_torchwood.png" @(
    @{ file="Torchwood_body.png"; x=20; y=35; w=80; h=75 },
    @{ file="Torchwood_fire1a.png"; x=30; y=5; w=60; h=50 },
    @{ file="Torchwood_eyes1.png"; x=35; y=50; w=50; h=30 }
) 120 120

# 13. Tallnut & Wallnut
Build-CompositePlant "plant_tallnut.png" @(
    @{ file="Tallnut_body.png"; x=20; y=10; w=80; h=105 }
) 120 120

Build-CompositePlant "plant_wallnut.png" @(
    @{ file="Wallnut_body.png"; x=20; y=20; w=80; h=85 }
) 120 120

# 14. Doom Shroom
Build-CompositePlant "plant_doom_shroom.png" @(
    @{ file="DoomShroom_body.png"; x=35; y=65; w=50; h=45 },
    @{ file="DoomShroom_head1.png"; x=15; y=15; w=90; h=70 }
) 120 120

# 15. Fume Shroom
Build-CompositePlant "plant_fume_shroom.png" @(
    @{ file="FumeShroom_body.png"; x=30; y=55; w=60; h=55 },
    @{ file="FumeShroom_head.png"; x=15; y=15; w=90; h=65 }
) 120 120

# 16. Hypno Shroom
Build-CompositePlant "plant_hypno_shroom.png" @(
    @{ file="HypnoShroom_body.png"; x=35; y=60; w=50; h=50 },
    @{ file="HypnoShroom_head.png"; x=15; y=10; w=90; h=75 }
) 120 120

# 17. Magnet Shroom
Build-CompositePlant "plant_magnet_shroom.png" @(
    @{ file="Magnetshroom_body.png"; x=30; y=55; w=60; h=55 },
    @{ file="Magnetshroom_head.png"; x=20; y=25; w=80; h=65 },
    @{ file="Magnetshroom_magnet.png"; x=30; y=5; w=60; h=45 }
) 120 120

# 18. Pumpkin
Build-CompositePlant "plant_pumpkin.png" @(
    @{ file="Pumpkin_back.png"; x=10; y=15; w=100; h=90 },
    @{ file="Pumpkin_front.png"; x=15; y=35; w=90; h=70 }
) 120 120

# 19. Blover
Build-CompositePlant "plant_blover.png" @(
    @{ file="Blover_stem1.png"; x=50; y=60; w=20; h=45 },
    @{ file="Blover_petal.png"; x=15; y=10; w=90; h=90 },
    @{ file="Blover_head.png"; x=35; y=30; w=50; h=50 }
) 120 120

# 20. Plantern
Build-CompositePlant "plant_plantern.png" @(
    @{ file="Plantern_leaf1.png"; x=15; y=75; w=90; h=35 },
    @{ file="Plantern_body.png"; x=25; y=15; w=70; h=80 },
    @{ file="Plantern_eyes.png"; x=35; y=35; w=50; h=30 }
) 120 120

# 21. Winter Melon
Build-CompositePlant "plant_winter_melon.png" @(
    @{ file="Melonpult_body.png"; x=20; y=40; w=80; h=70 },
    @{ file="WinterMelon_basket.png"; x=30; y=15; w=60; h=55 },
    @{ file="WinterMelon_melon.png"; x=40; y=10; w=40; h=40 }
) 120 120

# 22. Giant Walnut & Peashooter Devourer
Build-CompositePlant "giant_walnut.png" @(
    @{ file="Tallnut_body.png"; x=10; y=5; w=100; h=110 }
) 120 120

Build-CompositePlant "peashooter_devourer.png" @(
    @{ file="PeaShooter_backleaf.png"; x=10; y=70; w=45; h=35 },
    @{ file="PeaShooter_frontleaf.png"; x=60; y=70; w=45; h=35 },
    @{ file="GatlingPea_head.png"; x=15; y=10; w=90; h=90 }
) 120 120

Write-Host "`n=========================================="
Write-Host "  4. COMPOSITING & SYNCHRONIZING ZOMBIES"
Write-Host "=========================================="

function Build-CompositeZombie($outputName, $layers, [int]$canvasW = 120, [int]$canvasH = 140) {
    $dstPath = Join-Path $zombiesDir $outputName
    $bmp = New-Object System.Drawing.Bitmap $canvasW, $canvasH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    foreach ($layer in $layers) {
        $filePath = Join-Path $srcReanim $layer.file
        if (-not (Test-Path $filePath)) {
            $filePath = Join-Path $srcImg $layer.file
        }
        if (Test-Path $filePath) {
            $img = [System.Drawing.Image]::FromFile($filePath)
            $w = if ($layer.w) { $layer.w } else { $img.Width }
            $h = if ($layer.h) { $layer.h } else { $img.Height }
            $x = if ($layer.x -ne $null) { $layer.x } else { [int](($canvasW - $w) / 2) }
            $y = if ($layer.y -ne $null) { $layer.y } else { [int](($canvasH - $h) / 2) }
            $g.DrawImage($img, $x, $y, $w, $h)
            $img.Dispose()
        }
    }

    $bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host " [Zombie] Built -> $outputName"
}

# 1. Normal Zombie
Build-CompositeZombie "zombie_normal.png" @(
    @{ file="Zombie_body.png"; x=30; y=45; w=55; h=65 },
    @{ file="Zombie_head.png"; x=30; y=10; w=55; h=55 },
    @{ file="Zombie_outerarm_lower.png"; x=20; y=50; w=30; h=45 }
) 120 140

# 2. Conehead Zombie
Build-CompositeZombie "zombie_conehead.png" @(
    @{ file="Zombie_body.png"; x=30; y=48; w=55; h=65 },
    @{ file="Zombie_head.png"; x=30; y=20; w=55; h=55 },
    @{ file="Zombie_cone1.png"; x=35; y=2; w=45; h=45 },
    @{ file="Zombie_outerarm_lower.png"; x=20; y=52; w=30; h=45 }
) 120 140

# 3. Buckethead Zombie
Build-CompositeZombie "zombie_buckethead.png" @(
    @{ file="Zombie_body.png"; x=30; y=48; w=55; h=65 },
    @{ file="Zombie_head.png"; x=30; y=20; w=55; h=55 },
    @{ file="Zombie_bucket1.png"; x=32; y=5; w=50; h=45 },
    @{ file="Zombie_outerarm_lower.png"; x=20; y=52; w=30; h=45 }
) 120 140

# 4. Flag Zombie
Build-CompositeZombie "zombie_flag.png" @(
    @{ file="Zombie_flagpole.png"; x=65; y=5; w=35; h=110 },
    @{ file="Zombie_flag1.png"; x=70; y=10; w=45; h=40 },
    @{ file="Zombie_body.png"; x=25; y=48; w=55; h=65 },
    @{ file="Zombie_head.png"; x=25; y=15; w=55; h=55 }
) 120 140

# 5. Fast Runner Zombie
Build-CompositeZombie "zombie_fast.png" @(
    @{ file="Zombie_body.png"; x=30; y=45; w=55; h=65 },
    @{ file="Zombie_head2.png"; x=30; y=10; w=55; h=55 }
) 120 140

# 6. Newspaper Zombie
Build-CompositeZombie "zombie_newspaper.png" @(
    @{ file="Zombie_paper_body.png"; x=30; y=45; w=55; h=65 },
    @{ file="Zombie_paper_head_look.png"; x=30; y=12; w=55; h=55 },
    @{ file="Zombie_paper_glasses.png"; x=40; y=25; w=35; h=20 },
    @{ file="Zombie_paper_paper1.png"; x=15; y=50; w=60; h=55 }
) 120 140

# 7. Screendoor Zombie
Build-CompositeZombie "zombie_screendoor.png" @(
    @{ file="Zombie_body.png"; x=30; y=45; w=55; h=65 },
    @{ file="Zombie_head.png"; x=30; y=10; w=55; h=55 },
    @{ file="Zombie_screendoor1.png"; x=15; y=35; w=65; h=90 }
) 120 140

# 8. Disco Zombie
Build-CompositeZombie "zombie_disco.png" @(
    @{ file="Zombie_dancer_body1.png"; x=30; y=45; w=55; h=65 },
    @{ file="ZombieDancerHead_disco.png"; x=25; y=5; w=65; h=60 },
    @{ file="Zombie_dancer_colar.png"; x=32; y=42; w=50; h=25 }
) 120 140

# 9. Balloon Zombie
Build-CompositeZombie "zombie_balloon.png" @(
    @{ file="Zombie_balloon_bottom.png"; x=40; y=2; w=50; h=50 },
    @{ file="Zombie_balloon_body1.png"; x=30; y=55; w=55; h=65 },
    @{ file="Zombie_head.png"; x=30; y=30; w=50; h=50 },
    @{ file="Zombie_balloon_hat.png"; x=35; y=25; w=40; h=25 }
) 120 140

# 10. Imp Zombie
Build-CompositeZombie "zombie_imp.png" @(
    @{ file="Zombie_imp_body1.png"; x=35; y=45; w=50; h=55 },
    @{ file="Zombie_imp_arm1.png"; x=25; y=50; w=25; h=30 }
) 120 140

# 11. Gargantuar & Strong Zombie
Build-CompositeZombie "zombie_gargantuar.png" @(
    @{ file="Zombie_gargantuar_body1.png"; x=10; y=10; w=110; h=125 },
    @{ file="Zombie_gargantuar_arm1.png"; x=5; y=30; w=50; h=70 }
) 130 150

Build-CompositeZombie "zombie_strong_2.png" @(
    @{ file="Zombie_gargantuar_body1.png"; x=10; y=10; w=110; h=125 }
) 130 150

# 12. Boss Gargantuar & Boss Zomboss Mech
Build-CompositeZombie "zombie_boss_gargantuar.png" @(
    @{ file="Zombie_charred_gargantuar1.png"; x=10; y=10; w=110; h=125 }
) 130 150

Build-CompositeZombie "zombie_boss_lion_king.png" @(
    @{ file="Zombie_bossdriver_body.png"; x=25; y=35; w=70; h=75 },
    @{ file="Zombie_bossdriver_brain.png"; x=35; y=5; w=50; h=45 },
    @{ file="Zombie_bossdriver_face.png"; x=30; y=15; w=60; h=55 }
) 120 140

Write-Host "`n=========================================="
Write-Host "  ASSET SYNCHRONIZATION FINISHED SUCCESSFULLY"
Write-Host "=========================================="
