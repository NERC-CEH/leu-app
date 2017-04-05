<div class="list">
  <label class="item item-radio">
    <input type="radio" name="group" value="EN"
    <%- !_.keys(obj).length || obj['EN'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        English
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="ITA"
    <%- obj['ITA'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Italiano
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="SK"
    <%- obj['SK'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Slovenščina
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="CZ"
    <%- obj['CZ'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Check
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="PT"
    <%- obj['PT'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Portugal
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="FR"
    <%- obj['FR'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        French
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="NL"
    <%- obj['NL'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Dutch
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
</div>
