FROM nginx
#spa에서만 적용되는 법칙
#ssr에서는 안먹힘
COPY dist /react
COPY default.conf /etc/nginx/conf.d/default.conf
# nginx에 덮어쓰겠다는 말
EXPOSE 80