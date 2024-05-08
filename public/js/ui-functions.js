function toggleDialog(dialogId) {
  if (dialogId == '' || dialogId == undefined){
    const openDialog = document.querySelector('md-dialog[open]')
    if(openDialog){
      openDialog.removeAttribute('open');
      resetDialog(openDialog);
    }
    resetForm();
    return
  }
  const dialog = document.getElementById(dialogId);
  dialog.setAttribute('open', '');
}