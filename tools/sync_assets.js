const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname ? path.dirname(__dirname) : process.cwd();
const pakExtracted = path.join(rootDir, 'reference', 'extracted_pak');
const srcImg = path.join(pakExtracted, 'images');
const srcReanim = path.join(pakExtracted, 'reanim');
const dstBase = path.join(rootDir, 'public', 'pvz_assets');

const lawnsDir = path.join(dstBase, 'lawns');
const projDir = path.join(dstBase, 'projectiles');
const plantsDir = path.join(dstBase, 'plants');
const zombiesDir = path.join(dstBase, 'zombies');
const uiDir = path.join(dstBase, 'ui');

[lawnsDir, projDir, plantsDir, zombiesDir, uiDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Generating image processing instructions for PowerShell...');

// Build JSON configuration of files to process
const tasks = {
  lawns: [
    { src: path.join(srcImg, 'background1.jpg'), dst: path.join(lawnsDir, 'frontyard_day.png') },
    { src: path.join(srcImg, 'background2.jpg'), dst: path.join(lawnsDir, 'dark.png') },
    { src: path.join(srcImg, 'background3.jpg'), dst: path.join(lawnsDir, 'beach.png') },
    { src: path.join(srcImg, 'background3.jpg'), dst: path.join(lawnsDir, 'pool.png') },
    { src: path.join(srcImg, 'background4.jpg'), dst: path.join(lawnsDir, 'pool_night.png') },
    { src: path.join(srcImg, 'background5.jpg'), dst: path.join(lawnsDir, 'roof.png') },
    { src: path.join(srcImg, 'background6boss.jpg'), dst: path.join(lawnsDir, 'boss.png') }
  ],
  projectiles: [
    { src: path.join(srcImg, 'ProjectilePea.png'), dst: path.join(projDir, 'pea.png'), w: 48, h: 48 },
    { src: path.join(srcImg, 'ProjectileSnowPea.png'), dst: path.join(projDir, 'pea_ice.png'), w: 48, h: 48 },
    { src: path.join(srcImg, 'Projectile_star.png'), dst: path.join(projDir, 'star.png'), w: 48, h: 48 },
    { src: path.join(srcImg, 'ProjectileCactus.png'), dst: path.join(projDir, 'cactus.png'), w: 40, h: 24 },
    { src: path.join(srcReanim, 'Melonpult_melon.png'), dst: path.join(projDir, 'melon.png'), w: 56, h: 56 },
    { src: path.join(srcReanim, 'WinterMelon_projectile.png'), dst: path.join(projDir, 'melon_ice.png'), w: 56, h: 56 },
    { src: path.join(srcReanim, 'Cornpult_butter.png'), dst: path.join(projDir, 'butter.png'), w: 48, h: 48 },
    { src: path.join(srcReanim, 'Cabbagepult_cabbage.png'), dst: path.join(projDir, 'cabbage.png'), w: 48, h: 48 }
  ],
  ui: [
    { src: path.join(srcImg, 'SeedBank.png'), dst: path.join(uiDir, 'SeedBank.png') },
    { src: path.join(srcImg, 'Almanac_PlantCard.png'), dst: path.join(uiDir, 'Almanac_PlantCard.png') },
    { src: path.join(srcImg, 'Almanac_ZombieCard.png'), dst: path.join(uiDir, 'Almanac_ZombieCard.png') }
  ],
  composites: [
    // Plants
    {
      dst: path.join(plantsDir, 'plant_peashooter.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'PeaShooter_backleaf.png'), x: 10, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'PeaShooter_frontleaf.png'), x: 60, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'PeaShooter_head.png'), x: 20, y: 15, w: 80, h: 80 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_sunflower.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'SunFlower_bottompetals.png'), x: 15, y: 15, w: 90, h: 90 },
        { file: path.join(srcReanim, 'SunFlower_head.png'), x: 25, y: 25, w: 70, h: 70 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_twin_sunflower.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'SunFlower_double_petals.png'), x: 10, y: 10, w: 100, h: 100 },
        { file: path.join(srcReanim, 'TwinSunflower_leaf.png'), x: 20, y: 65, w: 80, h: 45 },
        { file: path.join(srcReanim, 'SunFlower_head.png'), x: 25, y: 20, w: 70, h: 70 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_snow_pea.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'PeaShooter_backleaf.png'), x: 10, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'PeaShooter_frontleaf.png'), x: 60, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'SnowPea_crystals1.png'), x: 15, y: 10, w: 45, h: 45 },
        { file: path.join(srcReanim, 'SnowPea_head.png'), x: 20, y: 15, w: 80, h: 80 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_repeater.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'PeaShooter_backleaf.png'), x: 10, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'PeaShooter_frontleaf.png'), x: 60, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'PeaShooter_eyebrow.png'), x: 15, y: 10, w: 35, h: 35 },
        { file: path.join(srcReanim, 'PeaShooter_head.png'), x: 20, y: 15, w: 80, h: 80 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_gatling_pea.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'PeaShooter_backleaf.png'), x: 10, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'PeaShooter_frontleaf.png'), x: 60, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'GatlingPea_head.png'), x: 20, y: 15, w: 80, h: 80 },
        { file: path.join(srcReanim, 'GatlingPea_helmet.png'), x: 25, y: 8, w: 75, h: 55 },
        { file: path.join(srcReanim, 'GatlingPea_barrel.png'), x: 70, y: 35, w: 45, h: 35 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_chomper.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Chomper_groundleaf1.png'), x: 10, y: 70, w: 40, h: 35 },
        { file: path.join(srcReanim, 'Chomper_groundleaf2.png'), x: 70, y: 70, w: 40, h: 35 },
        { file: path.join(srcReanim, 'Chomper_Headleaf1.png'), x: 25, y: 5, w: 40, h: 40 },
        { file: path.join(srcReanim, 'Chomper_head.png'), x: 15, y: 15, w: 90, h: 80 },
        { file: path.join(srcReanim, 'Chomper_bottomlip.png'), x: 20, y: 50, w: 80, h: 50 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_squash.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Squash_body.png'), x: 15, y: 15, w: 90, h: 95 },
        { file: path.join(srcReanim, 'Squash_eyes.png'), x: 30, y: 35, w: 60, h: 35 },
        { file: path.join(srcReanim, 'Squash_eyebrows.png'), x: 25, y: 25, w: 70, h: 30 },
        { file: path.join(srcReanim, 'Squash_stem.png'), x: 50, y: 5, w: 20, h: 25 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_cherry_bomb.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'CherryBomb_leaf1.png'), x: 35, y: 5, w: 50, h: 40 },
        { file: path.join(srcReanim, 'CherryBomb_left1.png'), x: 10, y: 35, w: 55, h: 55 },
        { file: path.join(srcReanim, 'CherryBomb_right1.png'), x: 55, y: 35, w: 55, h: 55 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_jalapeno.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Jalapeno_body.png'), x: 25, y: 15, w: 70, h: 95 },
        { file: path.join(srcReanim, 'Jalapeno_eye1.png'), x: 35, y: 35, w: 25, h: 25 },
        { file: path.join(srcReanim, 'Jalapeno_eye2.png'), x: 60, y: 35, w: 25, h: 25 },
        { file: path.join(srcReanim, 'Jalapeno_mouth.png'), x: 40, y: 58, w: 40, h: 25 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_spikeweed.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Caltrop_body.png'), x: 15, y: 25, w: 90, h: 70 },
        { file: path.join(srcReanim, 'Caltrop_horn1.png'), x: 10, y: 10, w: 35, h: 45 },
        { file: path.join(srcReanim, 'Caltrop_horn2.png'), x: 75, y: 10, w: 35, h: 45 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_torchwood.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Torchwood_body.png'), x: 20, y: 35, w: 80, h: 75 },
        { file: path.join(srcReanim, 'Torchwood_fire1a.png'), x: 30, y: 5, w: 60, h: 50 },
        { file: path.join(srcReanim, 'Torchwood_eyes1.png'), x: 35, y: 50, w: 50, h: 30 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_tallnut.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Tallnut_body.png'), x: 20, y: 10, w: 80, h: 105 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_doom_shroom.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'DoomShroom_body.png'), x: 35, y: 65, w: 50, h: 45 },
        { file: path.join(srcReanim, 'DoomShroom_head1.png'), x: 15, y: 15, w: 90, h: 70 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_fume_shroom.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'FumeShroom_body.png'), x: 30, y: 55, w: 60, h: 55 },
        { file: path.join(srcReanim, 'FumeShroom_head.png'), x: 15, y: 15, w: 90, h: 65 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_hypno_shroom.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'HypnoShroom_body.png'), x: 35, y: 60, w: 50, h: 50 },
        { file: path.join(srcReanim, 'HypnoShroom_head.png'), x: 15, y: 10, w: 90, h: 75 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_magnet_shroom.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Magnetshroom_body.png'), x: 30, y: 55, w: 60, h: 55 },
        { file: path.join(srcReanim, 'Magnetshroom_head.png'), x: 20, y: 25, w: 80, h: 65 },
        { file: path.join(srcReanim, 'Magnetshroom_magnet.png'), x: 30, y: 5, w: 60, h: 45 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_pumpkin.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Pumpkin_back.png'), x: 10, y: 15, w: 100, h: 90 },
        { file: path.join(srcReanim, 'Pumpkin_front.png'), x: 15, y: 35, w: 90, h: 70 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_blover.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Blover_stem1.png'), x: 50, y: 60, w: 20, h: 45 },
        { file: path.join(srcReanim, 'Blover_petal.png'), x: 15, y: 10, w: 90, h: 90 },
        { file: path.join(srcReanim, 'Blover_head.png'), x: 35, y: 30, w: 50, h: 50 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_plantern.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Plantern_leaf1.png'), x: 15, y: 75, w: 90, h: 35 },
        { file: path.join(srcReanim, 'Plantern_body.png'), x: 25, y: 15, w: 70, h: 80 },
        { file: path.join(srcReanim, 'Plantern_eyes.png'), x: 35, y: 35, w: 50, h: 30 }
      ]
    },
    {
      dst: path.join(plantsDir, 'plant_winter_melon.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Melonpult_body.png'), x: 20, y: 40, w: 80, h: 70 },
        { file: path.join(srcReanim, 'WinterMelon_basket.png'), x: 30, y: 15, w: 60, h: 55 },
        { file: path.join(srcReanim, 'WinterMelon_melon.png'), x: 40, y: 10, w: 40, h: 40 }
      ]
    },
    {
      dst: path.join(plantsDir, 'giant_walnut.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'Tallnut_body.png'), x: 10, y: 5, w: 100, h: 110 }
      ]
    },
    {
      dst: path.join(plantsDir, 'peashooter_devourer.png'), w: 120, h: 120,
      layers: [
        { file: path.join(srcReanim, 'PeaShooter_backleaf.png'), x: 10, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'PeaShooter_frontleaf.png'), x: 60, y: 70, w: 45, h: 35 },
        { file: path.join(srcReanim, 'GatlingPea_head.png'), x: 15, y: 10, w: 90, h: 90 }
      ]
    },

    // Zombies
    {
      dst: path.join(zombiesDir, 'zombie_normal.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_body.png'), x: 30, y: 45, w: 55, h: 65 },
        { file: path.join(srcReanim, 'Zombie_head.png'), x: 30, y: 10, w: 55, h: 55 },
        { file: path.join(srcReanim, 'Zombie_outerarm_lower.png'), x: 20, y: 50, w: 30, h: 45 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_conehead.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_body.png'), x: 30, y: 48, w: 55, h: 65 },
        { file: path.join(srcReanim, 'Zombie_head.png'), x: 30, y: 20, w: 55, h: 55 },
        { file: path.join(srcReanim, 'Zombie_cone1.png'), x: 35, y: 2, w: 45, h: 45 },
        { file: path.join(srcReanim, 'Zombie_outerarm_lower.png'), x: 20, y: 52, w: 30, h: 45 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_buckethead.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_body.png'), x: 30, y: 48, w: 55, h: 65 },
        { file: path.join(srcReanim, 'Zombie_head.png'), x: 30, y: 20, w: 55, h: 55 },
        { file: path.join(srcReanim, 'Zombie_bucket1.png'), x: 32, y: 5, w: 50, h: 45 },
        { file: path.join(srcReanim, 'Zombie_outerarm_lower.png'), x: 20, y: 52, w: 30, h: 45 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_flag.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_flagpole.png'), x: 65, y: 5, w: 35, h: 110 },
        { file: path.join(srcReanim, 'Zombie_flag1.png'), x: 70, y: 10, w: 45, h: 40 },
        { file: path.join(srcReanim, 'Zombie_body.png'), x: 25, y: 48, w: 55, h: 65 },
        { file: path.join(srcReanim, 'Zombie_head.png'), x: 25, y: 15, w: 55, h: 55 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_fast.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_body.png'), x: 30, y: 45, w: 55, h: 65 },
        { file: path.join(srcReanim, 'Zombie_head2.png'), x: 30, y: 10, w: 55, h: 55 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_newspaper.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_paper_body.png'), x: 30, y: 45, w: 55, h: 65 },
        { file: path.join(srcReanim, 'Zombie_paper_head_look.png'), x: 30, y: 12, w: 55, h: 55 },
        { file: path.join(srcReanim, 'Zombie_paper_glasses.png'), x: 40, y: 25, w: 35, h: 20 },
        { file: path.join(srcReanim, 'Zombie_paper_paper1.png'), x: 15, y: 50, w: 60, h: 55 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_screendoor.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_body.png'), x: 30, y: 45, w: 55, h: 65 },
        { file: path.join(srcReanim, 'Zombie_head.png'), x: 30, y: 10, w: 55, h: 55 },
        { file: path.join(srcReanim, 'Zombie_screendoor1.png'), x: 15, y: 35, w: 65, h: 90 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_disco.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_dancer_body1.png'), x: 30, y: 45, w: 55, h: 65 },
        { file: path.join(srcReanim, 'ZombieDancerHead_disco.png'), x: 25, y: 5, w: 65, h: 60 },
        { file: path.join(srcReanim, 'Zombie_dancer_colar.png'), x: 32, y: 42, w: 50, h: 25 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_balloon.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_balloon_bottom.png'), x: 40, y: 2, w: 50, h: 50 },
        { file: path.join(srcReanim, 'Zombie_balloon_body1.png'), x: 30, y: 55, w: 55, h: 65 },
        { file: path.join(srcReanim, 'Zombie_head.png'), x: 30, y: 30, w: 50, h: 50 },
        { file: path.join(srcReanim, 'Zombie_balloon_hat.png'), x: 35, y: 25, w: 40, h: 25 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_imp.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_imp_body1.png'), x: 35, y: 45, w: 50, h: 55 },
        { file: path.join(srcReanim, 'Zombie_imp_arm1.png'), x: 25, y: 50, w: 25, h: 30 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_gargantuar.png'), w: 130, h: 150,
      layers: [
        { file: path.join(srcReanim, 'Zombie_gargantuar_body1.png'), x: 10, y: 10, w: 110, h: 125 },
        { file: path.join(srcReanim, 'Zombie_gargantuar_arm1.png'), x: 5, y: 30, w: 50, h: 70 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_strong_2.png'), w: 130, h: 150,
      layers: [
        { file: path.join(srcReanim, 'Zombie_gargantuar_body1.png'), x: 10, y: 10, w: 110, h: 125 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_boss_gargantuar.png'), w: 130, h: 150,
      layers: [
        { file: path.join(srcReanim, 'Zombie_charred_gargantuar1.png'), x: 10, y: 10, w: 110, h: 125 }
      ]
    },
    {
      dst: path.join(zombiesDir, 'zombie_boss_lion_king.png'), w: 120, h: 140,
      layers: [
        { file: path.join(srcReanim, 'Zombie_bossdriver_body.png'), x: 25, y: 35, w: 70, h: 75 },
        { file: path.join(srcReanim, 'Zombie_bossdriver_brain.png'), x: 35, y: 5, w: 50, h: 45 },
        { file: path.join(srcReanim, 'Zombie_bossdriver_face.png'), x: 30, y: 15, w: 60, h: 55 }
      ]
    }
  ]
};

const tasksJsonPath = path.join(rootDir, 'tools', 'tasks.json');
fs.writeFileSync(tasksJsonPath, JSON.stringify(tasks, null, 2), 'utf8');
console.log('Saved task instructions to:', tasksJsonPath);

// Write PowerShell executor that loads JSON and processes System.Drawing
const psScript = `
Add-Type -AssemblyName System.Drawing

$jsonPath = "${tasksJsonPath.replace(/\\/g, '\\\\')}"
$data = Get-Content -Raw -Path $jsonPath -Encoding UTF8 | ConvertFrom-Json

Write-Host "--- Processing Lawns ---"
foreach ($item in $data.lawns) {
    if (Test-Path $item.src) {
        $img = [System.Drawing.Image]::FromFile($item.src)
        $bmp = New-Object System.Drawing.Bitmap $img.Width, $img.Height
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
        $bmp.Save($item.dst, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose(); $bmp.Dispose(); $img.Dispose()
        Write-Host "Exported lawn: $($item.dst)"
    }
}

Write-Host "--- Processing Projectiles & UI ---"
foreach ($item in ($data.projectiles + $data.ui)) {
    if (Test-Path $item.src) {
        $img = [System.Drawing.Image]::FromFile($item.src)
        $w = if ($item.w) { [int]$item.w } else { $img.Width }
        $h = if ($item.h) { [int]$item.h } else { $img.Height }
        $bmp = New-Object System.Drawing.Bitmap $w, $h
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $w, $h)
        $bmp.Save($item.dst, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose(); $bmp.Dispose(); $img.Dispose()
        Write-Host "Exported proj/ui: $($item.dst)"
    }
}

Write-Host "--- Processing Composites (Plants & Zombies) ---"
foreach ($comp in $data.composites) {
    $bmp = New-Object System.Drawing.Bitmap $comp.w, $comp.h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    foreach ($layer in $comp.layers) {
        if (Test-Path $layer.file) {
            $img = [System.Drawing.Image]::FromFile($layer.file)
            $w = if ($layer.w) { [int]$layer.w } else { $img.Width }
            $h = if ($layer.h) { [int]$layer.h } else { $img.Height }
            $x = if ($layer.x -ne $null) { [int]$layer.x } else { [int](($comp.w - $w)/2) }
            $y = if ($layer.y -ne $null) { [int]$layer.y } else { [int](($comp.h - $h)/2) }
            $g.DrawImage($img, $x, $y, $w, $h)
            $img.Dispose()
        }
    }
    $bmp.Save($comp.dst, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
    Write-Host "Exported composite: $($comp.dst)"
}
Write-Host "DONE PROCESSING ALL ASSETS."
`;

const psScriptPath = path.join(rootDir, 'tools', 'execute_tasks.ps1');
fs.writeFileSync(psScriptPath, psScript, 'utf8');

try {
  console.log('Running PowerShell image processing pipeline...');
  const output = execSync(`powershell -ExecutionPolicy Bypass -File "${psScriptPath}"`, { encoding: 'utf8' });
  console.log(output);
} catch (err) {
  console.error('Error executing PowerShell script:', err.message);
  if (err.stdout) console.log('stdout:', err.stdout);
  if (err.stderr) console.error('stderr:', err.stderr);
}
