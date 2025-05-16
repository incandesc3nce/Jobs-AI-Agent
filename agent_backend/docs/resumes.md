# Resumes

Резюме можно получить только с JWT токеном. Резюме хранятся в виде массива, что позволяет одному пользователю создавать несколько резюме.

`GET /api/resumes/get` - получает все резюме

`GET /api/resumes/get/[id]` - получает резюме по id резюме

`POST /api/resumes/create` - создает резюме со следующими параметрами в body:

```
  {
    title: string, должность
    skills: string, навыки через запятую
    experience: string, опыт
    location: string, местоположение
    workFormat: Onsite || Remote || Hybrid, формат работы
  }
```

`PATCH /api/resumes/update` - обновляет резюме с переданными данными, обновляет только переданные данные

```
  {
    title: string?, должность
    skills: string?, навыки через запятую
    experience: string?, опыт
    location: string?, местоположение
    workFormat: (Onsite || Remote || Hybrid)?, формат работы
  }
```

`DELETE /api/resumes/delete` - удаляет резюме по переданному в body id резюме

```
  {
    resumeId: string, id резюме для удаления
  }
```
