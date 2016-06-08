'use strict';
var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;
//var debugging = true;

function loan() {
  //console.log("loan() called");
  var account = {borrowed: 550000,
    balance: 286000,
    monthlyPayment: 1700,
    defaulted: 0,
    defaultsToForeclose: 5,
    foreclosed: false};
  function missPayment() {
    //console.log("missPayment called");
    account.defaulted += 1;
    if(account.defaulted >= account.defaultsToForeclose) {
      account.foreclosed = true;
      }
      //console.log("loan.account.defaulted: " + account.defaulted);
    }
  return {
    getBalance: function() {
      return account.balance;
      },
    receivePayment: function(amount) {
      //console.log("receivePayment called");
      if(amount < account.monthlyPayment) {
        missPayment();
        }
      account.balance -= amount;
      //console.log("payment: " + amount + "; balance: " + account.balance);
      },
    getMonthlyPayment: function() {
      return account.monthlyPayment;
      },
    isForeclosed: function() {
      return account.foreclosed;
      }
    };
}
function borrower(loan) {
  //console.log("borrower called");
  var account = {
    monthlyIncome: 1350,
    funds: 2800,
    loan: loan
  };
  return {
    getFunds: function() {
      //console.log("getFunds called");
      return account.funds;
      },
    makePayment: function() {
      var amountDue = loan.getMonthlyPayment();
      //console.log("makePayment called");
      //console.log("account.funds: " + account.funds);
      //console.log("loan.monthlyPayment: " + amountDue);
      if (account.funds > amountDue) {
        account.funds -= amountDue;
        loan.receivePayment(amountDue);
      } else {
        loan.receivePayment(account.funds);
        account.funds = 0;
        }
        //console.log("funds: " + account.funds);
      },
    payDay: function(){
      //console.log("payDay called");
      account.funds += account.monthlyIncome;
      //console.log("funds: " + account.funds);
      }
  };
}


stevesLoan = loan();
//console.log("stevesLoan: " + stevesLoan);
steve = borrower(stevesLoan);
//console.log("steve: " + steve);
while (!stevesLoan.isForeclosed() && stevesLoan.getBalance() > 0 ) {
  steve.payDay();
  steve.makePayment();
  month += 1;
}
monthsUntilEvicted = month;

