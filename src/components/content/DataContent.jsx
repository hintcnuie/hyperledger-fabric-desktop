// Copyright 2018 The hyperledger-fabric-desktop Authors. All rights reserved.

import React from 'react';
import { Col, Row, Table, Modal } from 'antd';
import { getQueryBlockSingleton, deleteQueryBlockSingleton } from '../../util/queryBlock';

const logger = require('electron-log');

const { Column, ColumnGroup } = Table;


export default class DataContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peerNum: 4,
      blackNum: 6,
      intelligentContractNum: 3,
      transactionNum: 6,
      url: '128.0.0.1:7571',
      status: '运行中',
      type: 'fabric',
      runningTime: '26',
      startTime: '2018-8-28',
      blockModal: false,
      transactionModal: false,
      currentBlock: 0,
      currentTransaction: 0,
      currentPage: 0,
      height: 0,
      timer: null,
      pageSize: 4,
      language: localStorage.getItem('language'),
      block: [],
      listData: [],
      transaction: [],
      loading: true,
    };

    this.showTransactionModal = this.showTransactionModal.bind(this);
    this.showBlockModal = this.showBlockModal.bind(this);
    this.blockModalHandleOk = this.blockModalHandleOk.bind(this);
    this.blockModalHandleCancel = this.blockModalHandleCancel.bind(this);
    this.transactionModalHandleOk = this.transactionModalHandleOk.bind(this);
    this.transactionModalHandleCancel = this.transactionModalHandleCancel.bind(this);
    this.onChange = this.onChange.bind(this);

    getQueryBlockSingleton().then((qb) => {
      qb.queryBlockFromDatabase(this.state.currentPage).then((block) => {
        if (block !== 'Data does not need change') {
          if (this.state.currentPage === 0) {
            const height = parseInt(block[0].id, 0);
            this.setState({ height });
          }
          this.setState({ block });
          console.warn('blocks:', this.state.block);
          this.setState({ loading: false });
        }
      });
    });
  }

  componentDidMount() {
    this.state.timer = setInterval(() => {
      getQueryBlockSingleton().then((qb) => {
        qb.queryBlockFromDatabase(this.state.currentPage).then((block) => {
          if (block !== 'Data does not need change') {
            if (this.state.currentPage === 0) {
              const height = parseInt(block[0].id, 0);
              this.setState({ height });
            }
            this.setState({ block });
          }
          qb.isNeedToQuery();
        });
      });
    }, 3000);
  }

  componentWillUnmount() {
    if (this.state.timer != null) {
      clearInterval(this.state.timer);
      deleteQueryBlockSingleton();
    }
  }


  onChange(current, pageSize) {
    this.setState({ loading: true });
    logger.info(current, pageSize);
    this.setState({
      currentPage: current - 1,
    });
    getQueryBlockSingleton().then((qb) => {
      qb.queryBlockFromDatabase(this.state.currentPage).then((block) => {
        if (block !== 'Data does not need change') {
          if (this.state.currentPage === 0) {
            const height = parseInt(block[0].id, 0);
            this.setState({ height });
          }
          this.setState({ block });
          console.warn('blocks:', this.state.block);
          this.setState({ loading: false });
        }
      });
    });
  }


  blockModalHandleOk() {
    this.setState({
      blockModal: false,
    });
  }

  blockModalHandleCancel() {
    this.setState({
      blockModal: false,
    });
  }

  transactionModalHandleOk() {
    this.setState({
      transactionModal: false,
    });
  }

  transactionModalHandleCancel() {
    this.setState({
      transactionModal: false,
    });
  }

  showBlockModal(id) {
    const tempListData = [{
      key: 'Data Hash:',
      value: this.state.block[id].hash,
    }, {
      key: 'Previous Hash:',
      value: this.state.block[id].preHash,
    }, {
      key: 'Block Height:',
      value: this.state.block[id].id,
    }, {
      key: 'Transactions:',
      value: this.state.block[id].num,
    }];

    const tempTransaction = [];
    for (let i = 0; i < this.state.block[id].num; i++) {
      const temp = {
        key: i,
        tx: this.state.block[id][i].tx !== '' ? ((this.state.block[id][i].tx).substring(0, 30) + '...') : '000000000000000000000000000000...',
        time: this.state.block[id][i].time,
      };
      tempTransaction[i] = temp;
    }
    this.setState({
      blockModal: true,
      currentBlock: id,
      listData: tempListData,
      transaction: tempTransaction,
    });
  }

  showTransactionModal(id) {
    this.setState({
      currentTransaction: id,
      transactionModal: true,
    });
  }


  render() {
    const outerDivStyle = {
      background: '#fff',
      padding: '2px',
      height: '100%',
    };
    const tableDivStyle = {
      padding: '10px',
      backgroundColor: '#fff',
      overflow: 'hidden',
    };
    return (
      <div style={outerDivStyle}>
        {/* <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> */}
        {/* <div> */}
        {/* <Row> */}
        {/* <Col span={12} > */}
        {/* <Card title={this.state.url} bordered={false} >{this.state.startTime}</Card> */}
        {/* </Col> */}
        {/* <Col span={4} > */}
        {/* <Card title="状态" bordered={false} >{this.state.status}</Card> */}
        {/* </Col> */}
        {/* <Col span={4} > */}
        {/* <Card title="类型" bordered={false} >{this.state.type}</Card> */}
        {/* </Col> */}
        {/* <Col span={4} > */}
        {/* <Card title="时长" bordered={false} >{this.state.runningTime}</Card> */}
        {/* </Col> */}
        {/* </Row> */}
        {/* </div> */}
        {/* <div style={{ margin: '2px 0' }}> */}
        {/* <Row gutter={2}> */}
        {/* <Col span={6}> */}
        {/* <Card title="peer 节点" bordered={false} >{this.state.peerNum}</Card> */}
        {/* </Col> */}
        {/* <Col span={6}> */}
        {/* <Card title="区块" bordered={false} > {this.state.blackNum}</Card> */}
        {/* </Col> */}
        {/* <Col span={6} > */}
        {/* <Card title="智能合约" bordered={false} >{this.state.intelligentContractNum}</Card> */}
        {/* </Col> */}
        {/* <Col span={6} > */}
        {/* <Card title="交易" bordered={false} >{this.state.transactionNum}</Card> */}
        {/* </Col> */}
        {/* </Row> */}
        {/* </div> */}


        {/*    列表: 区块高度; 区块哈希; 交易数量
            一级弹框: 区块信息
            二级弹框: 交易信息, Json数据以树形显示出来 */}
        <div style={tableDivStyle}>
          <Row>
            <Col span={24}>
              <Table
                bordered
                dataSource={this.state.block}
                loading={this.state.loading}
                pagination={{
                  defaultPageSize: this.state.pageSize,
                  showQuickJumper: true,
                  onChange: this.onChange,
                  total: this.state.height }}
              >
                <ColumnGroup title={this.state.language === 'cn' ? '最近区块' : 'Current Blocks'}>
                  <Column
                    defaultSortOrder="descend"
                    align="center"
                    title="ID"
                    dataIndex="id"
                    key="id"
                    width="10%"
                    sorter={(a, b) => a.id - b.id}
                  />
                  <Column
                    align="center"
                    title={this.state.language === 'cn' ? '哈希值' : 'Block Hash'}
                    key="hash"
                    render={(text, record) => (
                      <span>
                        <a href="#" onClick={() => this.showBlockModal(record.key)}>{record.hash}</a>
                      </span>
                    )}
                  />
                  <Column
                    align="center"
                    title={this.state.language === 'cn' ? '数量' : 'Transaction Num'}
                    dataIndex="num"
                    width="20%"
                    key="num"
                  />
                  {/* <Column */}
                  {/* align="center" */}
                  {/* title={this.state.language === 'cn' ? '生成时间' : 'Transaction'} */}
                  {/* dataIndex="key" */}
                  {/* width="10%" */}
                  {/* key="key" */}
                  {/* /> */}
                </ColumnGroup>
              </Table>
            </Col>
          </Row>
        </div>

        <Modal
          title={<div style={{ width: '100%', textAlign: 'center', fontSize: '130%' }}><strong>{this.state.language === 'cn' ? '区块' : 'Block Detail'}</strong></div>}
          visible={this.state.blockModal}
          onOk={this.blockModalHandleOk}
          onCancel={this.blockModalHandleCancel}
          footer={null}
          width="90%"
          centered
        >
          <Table
            dataSource={this.state.listData}
            pagination={false}
          >
            <Column
              align="right"
              title={<div style={{ width: '100%', textAlign: 'left' }}><strong>{this.state.language === 'cn' ? '区块头信息' : 'Block Header'}</strong></div>}
              width="20%"
              dataIndex="key"
            />
            <Column
              align="left"
              dataIndex="value"
            />
          </Table>

          <div style={{ width: '100%', height: '2px', backgroundColor: '#000' }}>
            <br />
          </div>

          <Table
            dataSource={this.state.transaction}
            pagination={false}
          >
            <Column
              align="right"
              dataIndex="tx"
              title={<div style={{ width: '100%', textAlign: 'left' }}><strong>{this.state.language === 'cn' ? '交易列表' : 'Transactions'}</strong></div>}
              width="46%"
              render={(text, record) => (
                <span>
                  <a href="#" onClick={() => this.showTransactionModal(record.key)}>{record.tx}</a>
                </span>
              )}
            />
            <Column
              align="left"
              dataIndex="time"
            />
          </Table>
        </Modal>

        <Modal
          title={<div style={{ width: '100%', textAlign: 'center', fontSize: '130%' }}><strong>{this.state.language === 'cn' ? '交易信息' : 'Transaction Detail'}</strong></div>}
          visible={this.state.transactionModal}
          onOk={this.transactionModalHandleOk}
          onCancel={this.transactionModalHandleCancel}
          footer={null}
          width="80%"
          centered
        >
          <strong>Tx:</strong>{this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].tx : '1'}<br />
          <strong>Creator MSP:</strong>{this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].creatorMSP : ''}<br />
          <strong>Endorser:</strong>{this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].endorser : ''}<br />
          <strong>Chaincode Name:</strong>{this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].chaincodeName : ''}<br />
          <strong>Type:</strong>{this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].type : ''}<br />
          <strong>Time:</strong>{this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].time : ''}<br />
          <strong>Reads:</strong><br />
          {JSON.stringify(this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].reads[0] : '')}<br />
          {JSON.stringify(this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].reads[1] : '')}<br />
          <strong>Writes:</strong><br />
          {/* FIXME: 二进制出现乱码.以下仅仅把乱码去除,后续还需重新解析 */}
          {(JSON.stringify(this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].writes[0] : '')).replace(/[\\]/g, '').replace(/[�]/g, '')}<br />
          {(JSON.stringify(this.state.block[this.state.currentBlock] ? this.state.block[this.state.currentBlock][this.state.currentTransaction].writes[1] : '')).replace(/[\\]/g, '').replace(/[�]/g, '')}<br />
        </Modal>
      </div>
    );
  }
}

