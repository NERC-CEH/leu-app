<ul class="table-view">
  <li>
    <%= t('The Centre for Ecology & Hydrology (UK) and European partners have joined forces to help map species of ladybird within Europe.') %>
  </li>
  <li>
    <%= t('For hundreds of years people in Europe have been recording when and where they see plants, animals and other wildlife. Ladybird species records will be used to learn more about the distribution and ecology of ladybirds. The information gathered is used by scientists to see how wildlife is changing due to factors such as climate change and the arrival of new species. Scientists could not do this work without the help of people, like you, reporting when and where they find a species.') %>
  </li>
  <li>
    <%= t('The development of this app was funded by the Natural Environment Research Council and the Centre for Ecology & Hydrology (UK).') %>
  </li>
  <li>
    <p><strong><%= t('App Development') %></strong></p>
    <p><%= t('This app was hand crafted with love by the BRC mobile development team. For suggestions and feedback please do not hesitate to') %> <a href='mailto:<%= obj.supportEmail %>?subject=European%20Ladybirds%20Support%26Feedback&body=%0A%0A%0AVersion%3A%20<%- obj.version %>%0ABrowser%3A <%- window.navigator.appVersion %>%0A'><%= t('contact us') %></a>.
    </p>
  </li>
  <li>
    <p class="app-version">v<%- obj.version %> (<%- obj.build %>)</p>
  </li>
</ul>