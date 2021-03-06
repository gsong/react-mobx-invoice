import { v4 } from 'node-uuid';
import moment from 'moment';

import { list as listFixture, invoiceNumberFixture } from './fixture';


let invoiceNumber = invoiceNumberFixture;
let list = [...listFixture];

export const STATUSES = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
};


export function statusFor(invoice) {
  let status = invoice.status;

  switch (status) {
    case STATUSES.SENT: {
      const due = moment(invoice.dueDate);
      if (due.isBefore(moment())) {
        status = STATUSES.OVERDUE;
      }
      return status;
    }

    case STATUSES.OVERDUE: {
      const due = moment(invoice.dueDate);
      if (due.isSameOrAfter(moment())) {
        status = STATUSES.SENT;
      }
      return status;
    }

    default:
      return status;
  }
}


export function update(invoice) {
  const index = list.findIndex((el) => invoice.id === el.id);

  invoice.status = statusFor(invoice);
  list = [
    ...list.slice(0, index),
    invoice,
    ...list.slice(index + 1),
  ];
  return invoice;
}


export function getList() {
  return list.map((invoice) => update(invoice));
}


export function find(id) {
  return getList().filter((invoice) => invoice.id === id)[0];
}


export function create(invoice) {
  const newInvoice = {
    ...invoice,
    id: v4(),
    number: ++invoiceNumber,
  };
  list.push(newInvoice);
  return newInvoice;
}


export function email(invoice) {
  // TODO: Actually send email
  invoice.status = 'sent';
  return update(invoice);
}


export function markPaid(invoice) {
  invoice.status = 'paid';
  return update(invoice);
}
