Add-Type -AssemblyName System.Drawing

$data = Get-Content -Raw -Path ".\tools\tasks.json" -Encoding UTF8 | ConvertFrom-Json

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

Write-Host "--- Processing Projectiles and UI ---"
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
        Write-Host "Exported item: $($item.dst)"
    }
}

Write-Host "--- Processing Composites ---"
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
Write-Host "ALL ASSETS EXPORTED SUCCESSFULLY."
