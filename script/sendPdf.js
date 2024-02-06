// Save as PDF
$(document).ready(function() {
  $('#saveButton').click(function() {
    var doc = new jspdf.jsPDF();
    html2canvas($('#content')[0]).then(function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = doc.internal.pageSize.getWidth();
      var imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('sample-file.pdf');
    });
  });
});





// $(document).ready(function($)
//   {
//     $(document).on('click', `#saveButton`, function(ev)
//     {
//       ev.preventDefault();
//       let content = document.getElementById('content');
     
//       let saveOptions = 
//     {
//       margin: 0,
//       filename: 'fileName' + '.pdf',
//       image: { type: 'svg', quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPdf: { unit: 'in', format: 'a4', orientation: 'portrait' }
//     };
      
//       html2pdf().from(content).set(saveOptions).save();
//   })
//   }
// )

// function exportHTMLtoPDF() {

//   ev.preventDefault();
//   let content = document.getElementById('content');
//   const office = document.getElementById('office').value;
//   const patient = document.getElementById('patient').value;
//   const date = document.getElementById('date').value;
//   const currentTime = `${new Date().getHours()}h:${new Date().getMinutes()}m`;

//   html2pdf().from(content).toPdf().save(office + '_' + 'patient-' + patient + '_' + date + '_' + currentTime + '.pdf');
// }

// function exportHTMLtoPDF(ev) {
  // let htmlElement = document.getElementById('content');

  // html2pdf().from(htmlElement).save('exported_file.pdf');
// TODO: Validation
//     ev.preventDefault();
//   let content = document.getElementById('content');
//   const office = document.getElementById('office').value;
//   const patient = document.getElementById('patient').value;
//   const date = document.getElementById('date').value;
//   const currentTime = `${new Date().getHours()}h:${new Date().getMinutes()}m`;

//   html2pdf().from(content).save(office + '_' + 'patient-' + patient + '_' + date + '_' + currentTime + '.pdf');

// }
// Format page on save : big gap before page and doesn't save all doc


//document.getElementById('saveButton').addEventListener('click', exportHTMLtoPDF);

//TODO: Save the form on the server ( subject to discuss). Find out how

//TODO: Send to the pdf file to default email address (provided by us) and to the client (email proved in the form) - Email in the form, ask somewhere the person who fills out the form about their email
