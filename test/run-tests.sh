#!/bin/bash

echo "🧪 Test: vendor_a_international.json"
curl -s -X POST http://localhost:3000/vendors -H "Content-Type: application/json" -d @test/sample_inputs/vendor_a_international.json
echo ""

echo "🧪 Test: vendor_b_incomplete.json"
curl -s -X POST http://localhost:3000/vendors -H "Content-Type: application/json" -d @test/sample_inputs/vendor_b_incomplete.json
echo ""

echo "🧪 Test: vendor_b_verified.json"
curl -s -X POST http://localhost:3000/vendors -H "Content-Type: application/json" -d @test/sample_inputs/vendor_b_verified.json
echo ""

echo "🧪 Test: invoice_a_with_alcohol.json"
curl -s -X POST http://localhost:3000/invoices -H "Content-Type: application/json" -d @test/sample_inputs/invoice_a_with_alcohol.json
echo ""

echo "🧪 Test: invoice_b_multi.json"
curl -s -X POST http://localhost:3000/invoices -H "Content-Type: application/json" -d @test/sample_inputs/invoice_b_multi.json
echo ""

echo "🧪 Test: invoice_b_std.json"
curl -s -X POST http://localhost:3000/invoices -H "Content-Type: application/json" -d @test/sample_inputs/invoice_b_std.json
echo ""
