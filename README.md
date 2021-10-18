# Websocket

_Fastcampus Node 웹소켓을 통한 실시간 인터랙션 구현 강의 내용을 정리해둔 자료입니다._

## tailwindCSS

1. vscode extensions에서 설치
1. npm 설치
1. tailwind.config.js 생성
1. settings.json => `"tailwindCSS.emmetCompletions": true`
   - 그래야 pug에서 자동완성이 뜸

## koa-static + koa-mount

- express static과 같은 기능이라 생각하면 됩.

## koa-websocket + koa-route

- `message` 이벤트가 발생
- broadcast를 위해서는 app.ws.server.clients를 돌며 send해줘야함
