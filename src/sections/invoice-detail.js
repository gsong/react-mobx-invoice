import React from 'react';
import { Link } from 'react-router';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import store from '../stores';


@observer
class InvoiceDetail extends React.Component {
  @action componentWillMount() {
    store.viewState.title = 'Invoice Detail';
    this.invoice = store.invoice.find(this.props.params.id);
  }

  render = () => (
    <div>
      <section>
        <p>name: {this.invoice.name}</p>
        <p>id: {this.invoice.id}</p>
      </section>
      <Link to="/">See all invoices</Link>
    </div>
  )
}

InvoiceDetail.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default InvoiceDetail;
