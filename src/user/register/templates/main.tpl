<div class="input-group form">
  <div class="input-row">
    <label class="media-object pull-left icon icon-mail"></label>
    <input id="user-email" type="text" placeholder="<%= t('Email') %>" name="email" >
  </div>
  <div class="input-row">
    <label class="media-object pull-left icon icon-user"></label>
    <input id="user-firstname" type="text" placeholder="<%= t('Firstname') %>" name="firstname" >
  </div>
  <div class="input-row">
    <label class="media-object pull-left icon icon-user"></label>
    <input id="user-secondname" type="text" placeholder="<%= t('Surname') %>" name="secondname" >
  </div>
  <div class="input-row">
    <label class="media-object pull-left icon icon-key"></label>
    <input id="user-password" type="password" placeholder="<%= t('Password') %>" name="password" >
  </div>
  <div class="input-row">
    <label class="media-object pull-left icon icon-key"></label>
    <input id="user-password-confirm" type="password" placeholder="<%= t('Confirm password') %>" name="password-confirm" >
  </div>
</div>

<div class="table-view-cell input-row terms-agree-toggle">
  <div class="label">
    <a href="<%= obj.siteUrl %>/terms-and-conditions"><%= t('I agree to Terms and Conditions') %></a>
  </div>
  <div id="user-terms-agree" class="toggle no-yes">
    <div class="toggle-handle"></div>
  </div>
</div>

<button id="register-button" class="btn btn-narrow btn-positive btn-block"><%= t('Create') %></button>
