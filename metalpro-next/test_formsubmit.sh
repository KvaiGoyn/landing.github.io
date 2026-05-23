#!/bin/bash
echo "Тестирование FormSubmit.co..."
curl -X POST "https://formsubmit.co/ajax/nezabut123@gmail.com" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+79122220241",
    "email": "test@example.com",
    "message": "Test message",
    "agree": "yes",
    "_subject": "Test",
    "_captcha": "false",
    "_template": "table"
  }' -v 2>&1 | grep -E "HTTP|< success|error" | head -20
