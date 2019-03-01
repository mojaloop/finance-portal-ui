
The following design document is synthesised from this document:
https://modusbox.atlassian.net/wiki/spaces/CV/pages/340820007/30+Admin+Portal#id-30AdminPortal-3)Financemanagementportal



## Tabs:
* Participants
* Settlements
* Settlement Windows


### Participants
Contains the participant list view


### Settlements
Contains the settlements list view


### Settlement Windows
Contains the settlement windows list view



## Views:
* Participant List
* Settlement List
* Settlement Detail
* Settlement Window List
* Settlement Window Detail
* Participant Detail


### Participant List
Detail visible in the list/table:
* Name
* ID
* Country
On selection, show up Participant Detail view


### Participant Detail
Detail:
* Name
* ID
* Country
* Currencies
* Current window info (by currency)
    * Outgoing transactions
    * Incoming transactions
    * Net position / Net debit Cap (%)
Actions:
* Stop transactions
* Edit NDC


### Settlement List
On selection of settlement, overlay Settlement Detail
Detail visible in the list/table:
* ID
* Start date
* End date
* Status


### Settlement Detail
Detail:
* Settlement ID
* Contained settlement window IDs
* Sum of debits
* Currency
* Start date
* End date
* Status
* Amounts (credit/debit/net) per participant/currency
Actions:
* Download payment file
* Commit settlement (if it is pending)


### Settlement Window List
On selection of settlement, overlay Settlement Window Detail
Detail visible in the list/table:
* Window ID
* Start date
* End date
* Currency
* Status


### Settlement Window Detail
Detail:
* Window ID
* Sum of debits
* Currency
* Start date
* End date
* Status
* Amounts (credit/debit/net) per participant
Actions:
* Close settlement window
