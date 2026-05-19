$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$front = Get-ChildItem -LiteralPath $root -Directory |
  Where-Object {
    (Test-Path -LiteralPath (Join-Path $_.FullName "index.html")) -and
    (Test-Path -LiteralPath (Join-Path $_.FullName "src\app.jsx"))
  } |
  Select-Object -First 1

if (-not $front) {
  Write-Host "Cannot find the frontend folder with index.html and src\app.jsx."
  Pause
  exit 1
}

function Test-PortOpen {
  param([int]$Port)

  $client = $null
  try {
    $client = [System.Net.Sockets.TcpClient]::new()
    $async = $client.BeginConnect("127.0.0.1", $Port, $null, $null)
    if (-not $async.AsyncWaitHandle.WaitOne(200)) {
      return $false
    }
    $client.EndConnect($async)
    return $true
  } catch {
    return $false
  } finally {
    if ($client) {
      $client.Close()
    }
  }
}

function Test-FrontendReady {
  param([int]$Port)

  try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/index.html" -UseBasicParsing -TimeoutSec 1
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
  $python = Get-Command py -ErrorAction SilentlyContinue
}

if (-not $python) {
  Write-Host "Python was not found. Install Python or start a local HTTP server manually."
  Pause
  exit 1
}

$selectedPort = $null
foreach ($port in 8767..8777) {
  if (Test-FrontendReady -Port $port) {
    $selectedPort = $port
    break
  }

  if (-not (Test-PortOpen -Port $port)) {
    Start-Process -FilePath $python.Source `
      -ArgumentList @("-m", "http.server", [string]$port, "--bind", "127.0.0.1") `
      -WorkingDirectory $front.FullName `
      -WindowStyle Hidden

    Start-Sleep -Seconds 2
    if (Test-FrontendReady -Port $port) {
      $selectedPort = $port
      break
    }
  }
}

if (-not $selectedPort) {
  Write-Host "Could not start the frontend server on ports 8767-8777."
  Pause
  exit 1
}

Start-Process "http://127.0.0.1:$selectedPort/index.html"
