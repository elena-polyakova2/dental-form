// Get the HTML elements that are needed
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

const form = document.getElementById('form');
const canvas = document.getElementById('canvas');
const modal = document.getElementById('modal');
const emailInput = document.getElementById('email-input');
const sendButton = document.getElementById('send-button');

// Add an event listener to the form submit event
form.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Show the modal to ask for an email address
  modal.style.display = 'block';
});

// Add an event listener to the send button click event
sendButton.addEventListener('click', function () {
  // Hide the modal
  modal.style.display = 'none';
  // Get the email address from the input field
  const email = emailInput.value;
  // Create a PDF document with A4 size and regular margins
  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.setMargins(10, 10, 10, 10);
  // Convert the form with canvas drawings to PDF using html2PDF
  html2PDF(form, pdf, {
    // Set the image quality to high
    imageQuality: 1,
    // Set the output type to dataurlstring
    outputType: 'dataurlstring',
    // Set a callback function when the conversion is done
    done: function (dataurlstring) {
      // Save the PDF file to the server using fs
      fs.writeFile('form-canvas.pdf', dataurlstring, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log('PDF file saved to the server');
        }
      });

      // Email the PDF file to two email addresses using nodemailer
      // Create a transporter object with your email service and credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-password',
        },
      });

      // Create a mail options object with the PDF file as an attachment
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: `${email}, another-email@example.com`,
        subject: 'Form with canvas drawings',
        text: 'Please find attached the PDF file of your form with canvas drawings.',
        attachments: [
          {
            filename: 'form-canvas.pdf',
            path: dataurlstring,
            contentType: 'application/pdf',
          },
        ],
      };

      // Send the email using transporter and mail options
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.error(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    },
  });
});