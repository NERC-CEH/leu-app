<% if (obj.login) { %>
<li class="table-view-cell">
  <a id="logout-button" class="navigate-right">
    <span class="media-object pull-left icon icon-logout"></span>
    <%= t('Logout') %>: <%- obj.firstname %> <%- obj.secondname %>
  </a>
</li>
<% } else { %>
<li class="table-view-cell">
  <a href="#user/login" class="navigate-right">
    <span class="media-object pull-left icon icon-user"></span>
    <%= t('Login') %>
  </a>
</li>
<li class="table-view-cell">
  <a href="#user/register" class="navigate-right">
    <span class="media-object pull-left icon icon-user-plus"></span>
    <%= t('Register') %>
  </a>
</li>
<% } %>

<li class="table-view-cell">
  <a id="samples-button" href="#samples" class="navigate-right">
    <span class="media-object pull-left icon icon-species"></span>
    <% if (obj.samples > 0) { %>
    <span class="badge <%- obj.needSync ? 'error' : '' %>"><%- obj.samples %></span>
    <% } %>
   <%= t('Records') %>
  </a>
</li>

<li class="table-view-divider"><%= t('Settings') %></li>
<li class="table-view-cell">
  <a href="#settings" class="navigate-right">
    <span class="media-object pull-left icon icon-settings"></span>
    <%= t('App') %>
  </a>
</li>


<li class="table-view-divider"><%= t('Info') %></li>
<li class="table-view-cell">
  <a href="#info/about" class="navigate-right">
    <span class="media-object pull-left icon icon-info"></span>
    <%= t('About') %>
  </a>
</li>
<li class="table-view-cell">
  <a href="#info/privacy" class="navigate-right">
    <span class="media-object pull-left icon icon-lock-closed"></span>
    <%= t('Privacy Policy') %>
  </a>
</li>
<li class="table-view-cell">
  <a href="#info/credits" class="navigate-right">
    <span class="media-object pull-left icon icon-heart"></span>
    <%= t('Credits') %>
  </a>
</li>
