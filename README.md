# TODOS_WEB_APP
There are web application to organize todos built with NodeJS+Express for api and React for client app. This app let users create todos, browse them (with filtration and sort), edit and delete.

Supports work in authorized mode (with saving in database) and non-authorized (with saving in local storage). Authorization is based on tokens (access and refresh) both stored in http-only cookies (refresh tokens also stored in database).
