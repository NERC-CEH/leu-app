<li class="table-view-divider"><%= t('Application') %></li>
<li class="table-view-cell">
  <a href="#settings/locale" class="navigate-right">
    <span class="media-object pull-right descript"><%= obj.country %></span>
    <span class="media-object pull-left icon icon-location"></span>
    <%= t('Country') %>
  </a>
</li>
<li class="table-view-cell">
  <a href="#settings/language" class="navigate-right">
    <span class="media-object pull-right descript"><%= obj.language %></span>
    <span class="media-object pull-left icon icon-location"></span>
    <%= t('Language') %>
  </a>
</li>
<li class="table-view-cell">
  <a id="app-reset-btn">
    <span class="media-object pull-left icon icon-undo"></span>
    <%= t('Reset') %>
  </a>
</li>
