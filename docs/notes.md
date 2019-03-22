
This design document is synthesised from [this document](
https://modusbox.atlassian.net/wiki/spaces/CV/pages/340820007/30+Admin+Portal#id-30AdminPortal-3%29Financemanagementportal).
As there are likely to have been transcription errors, or omissions, that document should likely be
considered the source of truth. If anything in JIRA tasks, that document, or this document doesn't
make sense- start a conversation with Matt or Iveth about it. If something in this document seems a
bad idea, or future tasks don't fit, start a conversation about it. This document, and the
associated UI, should be considered to be changeable and evolving- not prescriptive.

See also:

[StoriesOnBoard](https://mowali.storiesonboard.com/m/mowali-development)

[JIRA](https://modusbox.atlassian.net/wiki/spaces/CV/pages/338855324/Portals)

The following wireframe presents two views. On the left, a main view consisting of a navigation
bar, a filter, and a details pane. This is the view the user will be presented with after login.
The navigation bar is intended to contain the various sections of the UI- at the time of writing
_Participants_, _Settlements_, and _Settlement Windows_. On the right, a details view. This shows a
contrived _Settlements Detail_ view, modally overlaid atop the faded main view. The wireframe is
intended to present the general design of the interface. The specific information displayed in each
of these views is defined in the rest of this document.
![Shoddy UI wireframe](./wireframe.png?raw=true)


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
No filters required on the Participant List, for now. We'll add these if and when necessary.
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
Initially, a date range filter should be prepopulated with a sensible date range, and the
settlement list should be populated with settlements in this range. We don't paginate or supply
other filters at this stage because the Mojaloop API does not support this. If we move to a raw
database query, more filters and pagination should be easy to support.

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
Initially, a date range filter should be prepopulated with a sensible date range, and the
settlement window list should be populated with settlements in this range. We don't paginate or
supply other filters at this stage because the Mojaloop API does not support this. If we move to a
raw database query, more filters and pagination should be easy to support.

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
