
The following design document is synthesised from [this document](
https://modusbox.atlassian.net/wiki/spaces/CV/pages/340820007/30+Admin+Portal#id-30AdminPortal-3%29Financemanagementportal).

The design below provides detail on the generic tab, list, and details views shown in the
wireframe: ![Shoddy UI wireframe](./wireframe.png?raw=true)


## Tabs
* Participants
* Settlements
* Settlement Windows


### Participants
Contains the Participant List view.


### Settlements
Contains the Settlements List view.


### Settlement Windows
Contains the Settlement Windows list view.



## Views
* Participant List
* Settlement List
* Settlement Detail
* Settlement Window List
* Settlement Window Detail
* Participant Detail


### Participant List
On selection of participant, overlay Participant Detail
#### Columns
* Name
* ID
* Country
On selection, show up Participant Detail view


### Participant Detail
#### Detail
* Name
* ID
* Country
* Currencies
* Current window info (by currency)
    * Outgoing transactions
    * Incoming transactions
    * Net position / Net debit Cap (%)
#### Actions
* Stop transactions
* Edit NDC


### Settlement List
On selection of settlement, overlay Settlement Detail
#### Columns
* ID
* Start date
* End date
* Status


### Settlement Detail
#### Detail
* Settlement ID
* Contained settlement window IDs
* Sum of debits
* Currency
* Start date
* End date
* Status
* Amounts (credit/debit/net) per participant/currency
#### Actions
* Download payment file
* Commit settlement (if it is pending)


### Settlement Window List
On selection of settlement window, overlay Settlement Window Detail
#### Detail
* Window ID
* Start date
* End date
* Currency
* Status


### Settlement Window Detail
#### Detail
* Window ID
* Sum of debits
* Currency
* Start date
* End date
* Status
* Amounts (credit/debit/net) per participant
#### Actions
* Close settlement window
