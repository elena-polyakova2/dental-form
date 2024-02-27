const date = new Date();
document.getElementById("showCurrentDate").innerHTML = date.toDateString();

// Send the PDF data to the server
$(document).ready(function() {
  jQuery.validator.addMethod('email_rule', function (value, element) {
    if (/^([a-zA-Z0-9_\-\.]+)\+?([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value)) {
      return true;
    } else {
      return false;
    }
  });

  // Validation
  $('#content').validate({
    rules: {
      dateRequested: {
        required: true
      },    
      dentistEmail: {
        required: true,
        email_rule: true
      },
      office: {
        required: true
      },
      patient: {
        required: true
      }
    },
    messages: {
      dateRequested: "Please enter your requested date",
      dentistEmail: "Please enter a valid email address",
      office: "Please enter your office information",
      patient: "Please enter the patient information",
    },
  
});

$('#saveButton').click(function() {
  
  if ($('#content').valid()) {
    var doc = new jspdf.jsPDF();
    const dentist_email = document.getElementById('dentist-email').value;
    const office = document.getElementById('office').value;
    const patient = document.getElementById('patient').value;
    const date = document.getElementById('date').value;
    const currentTime = `${new Date().getHours()}h:${new Date().getMinutes()}m`;

    html2canvas($('#content')[0]).then(function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = doc.internal.pageSize.getWidth();
      var imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Convert the PDF to base64
      var pdfBase64 = doc.output('datauristring');

      // Send the PDF data to the server
      $.ajax({
        url: 'https://dental.elenasoftdev.ca/savePdfOnServer.php', // TODO: Replace with the client's server-side script URL
        type: 'POST',
        data: { 
          pdfData: pdfBase64,
          filename: office + '_' + 'patient-' + patient + '_' + date + '_' + currentTime + '.pdf',
          dentistEmail: dentist_email 
        },
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
  } else {
    // Show an error message if the form is not valid
    alert('Please fill in all the fields correctly.');
  }
});
});
// $(document).ready(function() {
//   $('#saveButton').click(function() {
//     var doc = new jspdf.jsPDF();
//     const office = document.getElementById('office').value;
//     const patient = document.getElementById('patient').value;
//     const date = document.getElementById('date').value;
//     const currentTime = `${new Date().getHours()}h:${new Date().getMinutes()}m`;

//     html2canvas($('#content')[0]).then(function(canvas) {
//       var imgData = canvas.toDataURL('image/png');
//       var imgWidth = doc.internal.pageSize.getWidth();
//       var imgHeight = canvas.height * imgWidth / canvas.width;
//       doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
//       // Convert the PDF to base64
//       var pdfBase64 = doc.output('datauristring');

//       // Send the PDF data to the server
//       $.ajax({
//         url: 'http://dental.elenasoftdev.ca/scripts/savePdfOnServer.php', // TODO: Replace with the client's server-side script URL
//         type: 'POST',
//         data: { 
//           pdfData: pdfBase64,
//           filename: office + '_' + 'patient-' + patient + '_' + date + '_' + currentTime + '.pdf'
//         },
//         success: function(response) {
//           console.log(response);
//         },
//         error: function(error) {
//           console.log(error);
//         }
//       });
//     });
//   });
// });




//TODO: Save the form on the server.

//TODO: Send to the pdf file to default email address (provided by us) and to the client (email proved in the form) - Email in the form, ask somewhere the person who fills out the form about their email
