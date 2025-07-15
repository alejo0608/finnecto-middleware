Write-Host "`n🧪 Test: vendor_a_international.json"
curl -Method POST http://localhost:3000/vendors -Headers @{ "Content-Type" = "application/json" } -Body (Get-Content -Raw -Path test/sample_inputs/vendor_a_international.json)
Start-Sleep -Seconds 1

Write-Host "`n🧪 Test: vendor_b_incomplete.json"
curl -Method POST http://localhost:3000/vendors -Headers @{ "Content-Type" = "application/json" } -Body (Get-Content -Raw -Path test/sample_inputs/vendor_b_incomplete.json)
Start-Sleep -Seconds 1

Write-Host "`n🧪 Test: vendor_b_verified.json"
curl -Method POST http://localhost:3000/vendors -Headers @{ "Content-Type" = "application/json" } -Body (Get-Content -Raw -Path test/sample_inputs/vendor_b_verified.json)
Start-Sleep -Seconds 1

Write-Host "`n🧪 Test: invoice_a_with_alcohol.json"
curl -Method POST http://localhost:3000/invoices -Headers @{ "Content-Type" = "application/json" } -Body (Get-Content -Raw -Path test/sample_inputs/invoice_a_with_alcohol.json)
Start-Sleep -Seconds 1

Write-Host "`n🧪 Test: invoice_b_multi.json"
curl -Method POST http://localhost:3000/invoices -Headers @{ "Content-Type" = "application/json" } -Body (Get-Content -Raw -Path test/sample_inputs/invoice_b_multi.json)
Start-Sleep -Seconds 1

Write-Host "`n🧪 Test: invoice_b_std.json"
curl -Method POST http://localhost:3000/invoices -Headers @{ "Content-Type" = "application/json" } -Body (Get-Content -Raw -Path test/sample_inputs/invoice_b_std.json)
Start-Sleep -Seconds 1
