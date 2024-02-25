const getDate = new Date();
const date = document.getElementById("showCurrentDate").innerHTML = getDate.toDateString();

// Save as PDF on the applicant's computer
$(document).ready(function() {
  $('#saveButton').click(function() {
    var doc = new jspdf.jsPDF();
    const office = document.getElementById('office').value;
    const patient = document.getElementById('patient').value;
    // const date = document.getElementById('date').value;
   
    const currentTime = `${new Date().getHours()}h:${new Date().getMinutes()}m`;

    html2canvas($('#content')[0]).then(function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = doc.internal.pageSize.getWidth();
      var imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save(office + '_' + 'patient-' + patient + '_' + date + '_' + currentTime + '.pdf');
    });
  });
});

// Send the PDF to the server 
$(document).ready(function() {
  $('#saveButton').click(function() {
    var doc = new jspdf.jsPDF();
    doc.html($('#content').html(), {
      callback: function (pdf) {
        // Convert PDF to base64
        var pdfBase64 = btoa(pdf.output()); 
        $.ajax({
          url: 'http://dental.elenasoftdev.ca/scripts/savePdfOnServer.php', // TODO: Replace with the client's server-side script URL
          type: 'POST',
          data: { pdfData: pdfBase64 },
          success: function(response) {
            alert(response);
            console.log(response);
          },
          error: function(error) {
            console.log(error);
          }
        });
      }
    });
  });
});

// <?php
// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//   $pdfData = base64_decode(str_replace('data:application/pdf;base64,', '', $_POST['pdfData']));
//   $dir = 'requested-applications';
//   // Create directory if it doesn't exist
//   if (!file_exists($dir)) {
//       mkdir($dir, 0777, true);
//   }
//   $filename = $_POST['filename'];
//   file_put_contents($dir . $filename, $pdfData);
//   echo "PDF saved successfully on the server";
// } else {
//   echo "No data received";
// }


// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     $pdfData = base64_decode(str_replace('data:application/pdf;base64,', '', $_POST['pdfData']));
//     $dir = 'requested-applications';
//     // Create directory if it doesn't exist
//     if (!file_exists($dir)) {
//         mkdir($dir, 0777, true);
//     }
//     $filename = $_POST['filename'];
//     file_put_contents($dir . $filename, $pdfData);
//     echo "PDF saved successfully on the server";
// } else {
//     echo "No data received";
// }
 
 
//  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//      require 'path/to/PHPMailerAutoload.php';
 
//      $pdfData = base64_decode(str_replace('data:application/pdf;base64,', '', $_POST['pdfData']));
//      $filename = $_POST['filename'];
 
//      $mail = new PHPMailer;
//      $mail->isSMTP();
//      $mail->Host = 'smtp.gmail.com'; // SMTP server
//      $mail->SMTPAuth = true;
//      $mail->Username = 'elena311979@gmail.com'; // SMTP username
//      $mail->Password = 'your-password'; // SMTP password
//      $mail->SMTPSecure = 'tls';
//      $mail->Port = 587;
 
//      $mail->setFrom('elena311979@gmail.com', 'Stomadent Dental');
//      $mail->addAddress('contact@elenasoftdev.ca'); // Add a recipient
//      $mail->addAddress($_POST['dentist_email']); // Variable applicant-recipient email
 
//      $mail->addStringAttachment($pdfData, $filename);
 
//      $mail->isHTML(true);
//      $mail->Subject = 'Here is your PDF';
//      $mail->Body    = 'Please find attached the PDF you filled out on stomadent.com';
 
//      if(!$mail->send()) {
//          echo 'Message could not be sent.';
//          echo 'Mailer Error: ' . $mail->ErrorInfo;
//      } else {
//          echo 'Message has been sent';
//      }
//  }