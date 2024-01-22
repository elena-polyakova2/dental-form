<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>.error {color: #FF0000;}</style>

</head>
<body>
  <div class="container" style="border:1px solid #000;height:842px;width:595px;padding-left:8px;margin:auto;">
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

      <p style="margin-left:60%;margin-bottom:0; margin-right:0;text-indent: 5em;"><span style="line-height:50%;font-size:14px;">192 Gammage St,</span></p>
      <p style="margin-left:60%;margin-top:0;margin-bottom:0; margin-right:0;text-indent: 5em;"><span style="line-height:50%;font-size:14px;">London, Ontario</span></p>

      <p style="width:200px;height:70px;float: left;margin-left:1%;margin-top:1%;">
        <img src="images\stomadent_logo_.svg">
      </p>
    
      <p style="margin-left:50%;margin-top:0;margin-bottom:0; margin-right:0;text-indent: 8.8em;"><span style="line-height: 50%;font-size:14px;">N5Y 2B3</span></p>
      <p style="margin-left:50%;margin-top:0;margin-bottom:0; margin-right:0;text-indent: 8.8em;"><span style="line-height: 50%;font-size:14px;">T: 519-636-7900</span></p>
      <p style="margin-left:50%;margin-top:1%;margin-bottom:0; margin-right:0;text-indent: 8.8em;"><span style="line-height: 50%;font-size:14px;">www.stomadent.ca</span></p>
      <p style="margin-left:50%;margin-top:0;margin-bottom:0; margin-right:0;text-indent: 8.8em;"><span style="line-height: 50%;font-size:14px;">info@stomadent.ca</span></p><br />

             
      <div class="row" style="width:100%;margin-top:0;">
        <div class="row" style="width:100%;">
          <p style="width:30%;"><span class="error">* required field</span></p>
        </div>
      </div>
        <!-- Date -->
        <p class="row" style="width:100%;margin-top:0;"> 
          <p class="col-50" style="width: 40%;float:left;margin-top:0;">      
            <label for="date">Date:</label>
            <input type="date" id="date" name="date">       
            <span class="error">* </span>
            <br><br>
          </p>

          <!-- Date Requested-->
          <p class="col-50" style="width: 40%;float:right;border:#000 1px solid;margin-right:5%;margin-top:0;">         
            <label for="date-requested">DATE REQUESTED:</label><br />
            <input type="date" id="date" name="date-requested">       
            <span class="error">* </span>         
          </p>
        </p>

        <!-- Office -->
        <p class="col-100" style="width: 100%;float:left;margin-top:0;">  
          <label for="office">Office:</label>
          <textarea id="office" name="office" rows="1" cols="65"></textarea>               
        </p>

        <!-- Dentist -->
        <p class="col-100" style="width: 100%;float:left;margin-top:0;">  
          <label for="dentist">Dentist:</label>
          <textarea id="dentist" name="dentist" rows="1" cols="65"></textarea>               
        </p>

        <!-- Patient -->
        <p class="col-100" style="width: 100%;float:left;margin-top:0;">  
          <label for="patient">Patient:</label>
          <textarea id="patient" name="patient" rows="1" cols="65"></textarea>               
        </p>

        <p class="row" style="width:100%;margin-top:0;">
          <!-- Sex: -->
          <p class="col-40" style="width:20%;float:left;margin-top:0;"> 
            <label for="sex">Sex:</label>
            <input type="checkbox" name="gender" value="male">M
            <input type="checkbox" name="gender" value="female">F
          </p>

          <!-- Age: -->
          <p class="col-40" style="width:20%;float:left;margin-top:0;"> 
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" min="1" max="150">
          </p>
       

        <!-- TODO: Canva -->
        <p class="col-50" style="width: 40%;float:right;margin-top:0;">
          <img src="images\teeth.png" width="40%">
        </p>
        </p>
        <!-- Detailed Instruction -->
        <p class="col-50" style="width: 30%;float:left;margin-top:0;">  
          <label for="detailed-instruction">Detailed Instruction:</label>
          <textarea id="detailed-instruction" name="detailed-instruction" rows="7" cols="30"></textarea>               
        </p>

        

        <!-- Return to me as a: -->
        <p class="col-100" style="width: 100%;float:left;margin-top:0"> 
          <label for="return-as" style="text-decoration:underline;">Return to me as a:</label><br />
          <input type="checkbox" name="return-as" value="wax-up">wax up<br />
          <input type="checkbox" name="return-as" value="diagnostic">diagnostic<br />
          <input type="checkbox" name="return-as" value="try-in">try in<br />
          <input type="checkbox" name="return-as" value="bisque-bake">bisque bake<br />
          <input type="checkbox" name="return-as" value="finish">finish
        </p>

        <!-- TODO: Dentist's Signature -->
        <p class="col-100" style="width: 100%;float:left;margin-top:0"> 
          <label for="return-as">Dentist's Signature:</label><br />
        </p>

        <!-- Buttons -->
        <p class="col-100" style="width: 100%;float:left;margin-top:0">
          <input type="reset" value="Reset">
          <input type="submit" name="submit" value="Submit">
          <input type="submit" name="print" value="Print">
        </p>
    </form>
  </div>
  <?php
    
  ?>
</body>
</html>