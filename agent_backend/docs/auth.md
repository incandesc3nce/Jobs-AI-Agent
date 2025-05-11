# Authentication

Для аутентификации используется JWT-токен. Он передается в заголовке `Authorization Bearer <token>`.

Токен можно получить, отправив POST-запрос на `/api/auth/login` с телом запроса в формате JSON

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

Если у вас нет учетной записи, вы можете зарегистрироваться, отправив POST-запрос на `/api/auth/sign-up` со следующим телом запроса:

```json
{
  "username": "your_username",
  "password": "your_password",
  "confirmPassword": "your_password"
}
```

В случае успешной аутентификации сервер вернет ответ в формате JSON со следующими параметрами:

```json
{
  "token": "your_token",
  "message": "messageFromBackend",
  "success": true
}
```

где `token` - это JWT-токен, который нужно использовать для аутентификации в последующих запросах.

В случае неверных данных для регистрации или входа, вернется ответ с ошибкой 400 и сообщением. Если провалилась валидация, то в ответ будет включен объект c полями не прошедшими валидацию:

```json
{
  "message": "Validation error",
  "success": false,
  "errors": {
    // ошибки валидации
    "username": ["Username is required"], // username
    "password": ["Password is required"], // password
    "passwordAreEqual": false // password != confirmPassword
  }
}
```

Токен имеет срок действия 5 дней. После его истечения нужно повторно пройти аутентификацию, чтобы получить новый токен.
