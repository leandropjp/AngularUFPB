  function test()
{
  // $("#sample1").focus().val('TEST');

  $("#sample1").parent('.mdl-textfield').removeClass('is-invalid').addClass('is-dirty')
  $("#sample2").parent('.mdl-textfield').removeClass('is-invalid').addClass('is-dirty')
  

  // var dialogInputs = document.querySelectorAll('.mdl-textfield');
  //       console.log(dialogInputs.length);
		// for (var i = 0, l = dialogInputs.length; i < l; i++) {

  // 			dialogInputs[i].get(0).MaterialTextfield.checkDirty();
  // 			// dialogInputs[i]..MaterialTextfield.change();
		// }
}

function closeDrawer(){
   var layout = document.querySelector('.mdl-layout');
   layout.MaterialLayout.toggleDrawer();
}

function selectField(){
  /**

Update the selected option. *
@param {string} value The value of the option which is selected.
@public
*/
MaterialSelectfield.prototype.change = function(value) {
var option = null;
for (var i = 0; i < this.options_.length; i++) {
option = this.options_[i];
if (option.value === value) {
break;
}
}
if (option === null) {
return;
}
this.selectedOptionValue_.textContent = option.textContent;
option.selected = true;
};

MaterialSelectfield.prototype['change'] =
MaterialSelectfield.prototype.change;

}

function changeLocation(){

document.getElementById('mypicker').i18n = {
  today: 'tänään',
  cancel: 'peruuta',
  firstDayOfWeek: 1,
  monthNames: ['tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu',
               'heinäkuu','elokuu','syyskuu','lokakuu','marraskuu','joulukuu'],
  weekdaysShort: ['su','ma','ti','ke','to','pe','la'],
  formatDate: function(d) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('.');
  },
  formatTitle: function(monthName, fullYear) {
    return monthName + ' ' + fullYear;
  }
}



moment.locale('pt-br');
// Assign the i18n property with locale data from Moment.js.
document.querySelector('vaadin-date-picker').i18n = {
  monthNames: moment.months(),
  weekdaysShort: moment.weekdaysShort(),
  firstDayOfWeek: moment.localeData().firstDayOfWeek(),
  today: 'Hoje',
  cancel: 'Cancelar',
  formatDate: function(d) {
    return moment(d).format(moment.localeData().longDateFormat('L'));
  },
  formatTitle: function(monthName, fullYear) {
    return monthName + ' ' + fullYear;
  }
};
}