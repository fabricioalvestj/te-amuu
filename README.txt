SITE F + I — versão estática para GitHub Pages

ARQUIVOS
- index.html: página pública
- style.css / app.js: visual e funcionalidades
- fab.html / fab.css / fab.js: painel FAB
- assets/: pasta para imagens adicionais, se desejar

PUBLICAÇÃO
1. Extraia o ZIP.
2. Envie os arquivos e a pasta assets para a raiz do repositório GitHub.
3. No GitHub, abra Settings > Pages.
4. Em Build and deployment, selecione Deploy from a branch.
5. Escolha a branch main e a pasta / (root), salve.
6. Aguarde a publicação. O site ficará no endereço do GitHub Pages.
7. Abra /fab.html para acessar o painel.

PAINEL FAB
- Senha inicial: girassol123
- Troque a senha no próprio painel.
- Configure a data do contador, textos, versículos e localização.
- Fotos e configurações são salvas no armazenamento local do navegador (IndexedDB/localStorage).

LIMITAÇÕES IMPORTANTES DESTA VERSÃO SEM BACKEND
GitHub Pages hospeda arquivos estáticos. Sem servidor ou banco de dados:
- Alterações feitas no FAB não são publicadas/sincronizadas para outros dispositivos ou visitantes.
- As fotos adicionadas aparecem somente no navegador onde foram enviadas.
- A senha fica no código do navegador e não protege de verdade uma área administrativa pública.
- Não há registro global e confiável de visitas, nem identificação de quando uma visitante específica entrou.
- O contador de visitas do painel é apenas uma contagem local demonstrativa.

Para que o painel seja realmente compartilhado, privado e registre visitas de qualquer pessoa, será necessário algum serviço externo de backend/analytics. Isso pode ser feito sem Supabase, mas não é possível com GitHub Pages sozinho.

MAPA
O mapa já vem pré-configurado para Povoado Brejo de São Félix, Maranhão, Brasil. Você pode trocar o local no painel FAB. Informe um endereço, nome de local ou coordenadas. O site incorpora uma busca do Google Maps e oferece o link para abrir no Maps.
