# WiEECS Invoice Generator

A simple webpage that allows you to generate sponsor invoices. The code is a little janky but fairly straightforward to understand.

## Invoicing process
Make sure you have your sponsor's name and address to make the invoice out to.

## Usage
**Setup**

Clone the repo using `git clone https://github.com/womenineecs/invoice-generator`.

**Run the Server**

- `cd` into the repo's folder and run a local server using the command `python3 -m http.server`
- Then, navigate to [http://localhost:8000/](http://localhost:8000/) (or a different port if needed, i.e. run `python3 -m http.server 9090` and head to port 9090 instead).

**Generate the Invoice**

To make an invoice, select fields in the top form section, then click "Generate PDF" to open the print preview. Save as PDF, then upload the invoice to Google Drive and send it off!
- Make sure to select tier, and select WiEECS sponsor checkbox. Then it should all show up in generated PDF.

## Development
Clone the repo. Change values in `main.js` and corresponding fields in `index.html`. Change styling to fit your needs. Note that this page uses print stylesheets to make the output PDF formatted correctly.