$headers = @{
    "apikey" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuZWZlZXZ0dXhhd3ZrampkY3plIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU1Mzc4MiwiZXhwIjoyMDkzMTI5NzgyfQ.LrAz-FYIslWepp17MXAkcPvE6rue8bIBv-BlIKxdpK0";
    "Authorization" = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuZWZlZXZ0dXhhd3ZrampkY3plIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU1Mzc4MiwiZXhwIjoyMDkzMTI5NzgyfQ.LrAz-FYIslWepp17MXAkcPvE6rue8bIBv-BlIKxdpK0";
    "Content-Type" = "application/json"
}

$body = '{
    "email": "administrador@rathigas.com",
    "password": "Tde.Cyp7",
    "email_confirm": true,
    "user_metadata": {
        "full_name": "Administrador Global"
    }
}'

Write-Host "Criando usuário no Supabase Auth..."
$userResponse = Invoke-RestMethod -Uri "https://enefeevtuxawvkjjdcze.supabase.co/auth/v1/admin/users" -Headers $headers -Method Post -Body $body

$userId = $userResponse.id

if ($userId) {
    Write-Host "Usuário criado com sucesso! ID: $userId"
    Write-Host "Atualizando perfil para is_admin = true..."
    
    $patchBody = '{"is_admin": true}'
    Invoke-RestMethod -Uri "https://enefeevtuxawvkjjdcze.supabase.co/rest/v1/profiles?id=eq.$userId" -Headers $headers -Method Patch -Body $patchBody
    
    Write-Host "Pronto! O usuário administrador@rathigas.com agora é um Admin Global."
} else {
    Write-Host "Falha ao criar o usuário. Tente novamente."
}
