// Send the PDF data to the server
$(document).ready(function() {
  $('#saveButton').click(function() {
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




//TODO: Save the form on the server ( subject to discuss).

//TODO: Send to the pdf file to default email address (provided by us) and to the client (email proved in the form) - Email in the form, ask somewhere the person who fills out the form about their email
