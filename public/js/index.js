//add user
$('#addUserGameBiodata').submit(function (event) {
  alert('data berhasil disimpan');
});

$('#update_user').submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n['name']] = n['value'];
  });

  var request = {
    url: `http://localhost:5000/api/users/${data.id}`,
    method: 'PUT',
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert('Data Updated Successfully!');
  });
});

if (window.location.pathname == '/dashboard') {
  $ondelete = $('.table tbody td a.delete');
  $ondelete.click(function () {
    var id = $(this).attr('data-id');

    var request = {
      url: `http://localhost:5000/api/users/${id}`,
      method: 'DELETE',
    };

    if (confirm('Do you really want to delete this record?')) {
      $.ajax(request).done(function () {
        alert('Data Deleted Successfully!');
        location.reload();
      });
    }
  });
}
