User Login 
User From the old PM can login on new PM using they old credential,
if User From old PM is login using their old credentials 
they should change their password.
After the user change the password.
##Change Password Old user
-- The User Has permission to approve the user receive realtime notification that the user has trying to login using their old credentials
User has permissions to view the credentials, can view the user who tried to login
validating the user credentials also have User image to the user who tried to login.
after validating the user, Users have permissions to approve the user can decide either if it's approve or denied.
-- Users Has assign device 
the users from branches has limited access on PM if the braches user use other device cannot login.
if Users want to access the PM using others devices they need to send request to access the PM using other devices.
it will send approval request.
Users has permission to view the request receive the approval request.
Only user has permission to approve, can only accept the request.
approval request can be denied.
approval request can be temporary used the device has interval or can set expiration date.
branch user need approval to connect PM using other device.
After approval User who send the request receive the message that it's approved it should be real time.
Users that denied can be blocked depend on approval. if denied has reason why it's denied(optional).

 Permission
Permission can add dynamically
Roles can add dynamic.
Users can assign role dynamic.

Company
    --has unique name 
    --Code
    --has connected to group
    --can disable

Group
    -name
    -code
    - can disable
Branches
    -can disable
    -connected to Group
user - assign to branches
has transact log
has activity log
user can view if it online or not. connected.
 - Plege Page 
 - User from branches appraice the sanla items
 - branch register the items in PM.
 - Papeleta code,
 items
 - Item code ,
 -  item description


Pledge has branch register the papeleta that pledge can be renewal, interest - depends on branch rate, or group sometimes changing also depend how many month sometimes change the interest. it show'
if its new, renew or redeemed, it's also have date when the renewal or redeemed date. has capital bracket depends on branch and items has advance interest has service charge depends on branch, storage fee, penalty depends on items date, and branch rate, has discount number, items can take a 3 pictures, proccessby, total, has affidavit, notary, customer name who pledge the item.
Pledge also have Redemption page where User can see the Pledge that already redeemed and rematado.
    - Branch code
    - Transact_no
    - papeleta_number
    - Empeno_date
    -redemption_date
    -RedemptionSequence
    -MaturityDate
    -ExpiryDate
    -OldPapeleta
    -NewPapeleta

Customer 
-- Customer register by branch customer dont have access the PM,
--Customer details like the name firstname and lastname, the suffix it have, fullname, gender, address, phone number, birthdate, Valid Id, branch where register. Customer also can go back so after customer registered next time to visit his/her not to register again.

address should be selectable not input field.
what is city, barangay, street, municipality, and region. should be selected.

-interest depends on month example first month is 3% and it will be increase by 1% and second month it 4% it will increase until 7 months if the pledge in not redeemed it will pop the branch that this pledge is nearly due date. after the due date its automatically rematado.
-rematado item has report in the end of the month or depend on request it also see on rematado list.
-papeleta has also list so the users has permission to add the items, so it not be input field it's dropdown or select 
- items has Quantity karat, gram, description, stoneP, stoneC, AppValue, and papeleta id.

-Other bussineses 
has Cash_code = cash code contents of Expences and other bussines transaction sim_load, remittances, cashin and cash_out, it will be dynamic can be register new cash_code,

PM also have cash disbursements
it will contents of all transactions of PM, expenses and profit.
other business also have 
on page so if there a new other bussiness it will show to navbar
it accept API request. and Create automatic Page like listing, 
Pawnshop manager also have money_exchange. it's automatically update base on foreign exchage changes it has an button to update the foreign change. Have rates also and margin,

All Transaction has daily reports it's content of all transation from day-by-day oparations.

PM has cash count where the all cash that receive from the day it will input there and after the cash input it's show to tally report page.
show the lost and exceeded cash. 
it content also of redeem anywhere.
in dashboad it will show the graph of the daily status content of income from other day, and how many transaction per day. it's show the statistic of Branch Income, also the lost. and logs.