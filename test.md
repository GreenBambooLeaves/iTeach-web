```js
// POST api/sessions/add
{
    "session":{
        "name":"test",
        "remark":"remarkfortest",
        "masterId":"5ed63e4951617e65686cc6fe",
        "time":45
    },
    "questions":[
        {
            "content":"abcd",
            "classification":"choice",
            "number":1,
            "option":["a","b","c"],
            "answer":["a"]
        },
        {
            "content":"how are you",
            "classification":"reponse",
            "number":2,
            "answer":["fine"]
        }
    ]
}
// POST api/sessions/join/:id
{
    "userId":"5ed5b5f210b24d4e60a828b0",
    "answers":[
        {
            "questionId":"5ee32dad74e78165049f3fe3",
            "content":["a"]
        },
        {
            "questionId":"5ee32dad74e78165049f3fe4",
            "content":["fine"]
        }
    ]
}
```

