<% if (obj.useTraining) { %>
<div class="main-header training"><%= t('Training') %></div>
<% } %>
<% if (!obj.loggedIn) { %>
  <div id="login-warning" class="warning-message"><%= t('Looks like you have not signed in to your account yet.') %>
    <a href='#user/login' class="btn btn-narrow btn-block"><%= t('Sign in') %></a>
  </div>
<% } %>
<div class="info-message">
  <p>
    <%= t('Saved recordings.') %>
  </p>
</div>
<ul id="samples-list" class="table-view no-top"></ul>