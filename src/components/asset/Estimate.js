import { ButtonBase } from '@material-ui/core';
import React, { Fragment, useRef } from 'react';
import styled, { css } from 'styled-components';
import { dateToYYYYMMDD, numberFormat } from '../../lib/formatter';

const EstimateArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 320px;
    background-color: #ebebeb;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    &:hover {        
        &::after {
            opacity: 0
        }
    }
    &::after {
        transition: opacity .2s ease-in-out;
        content: '견적서 미리보기';
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0; top: 0;
        position: absolute;
        color: #222;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.2);
        width: 100%; height: 100%;
    }
`;
const Estimate = styled.div`
    box-sizing: border-box;
    min-width: 800px;
    max-width: 800px;
    position: absolute;
    text-align: left;
    margin: 0 auto;
    padding: 90px;
    background: #fff;
    ${props => !props.view && `
        position: absolute;
        bottom: 100%;
    `}
    ${props => props.view && `
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(0.3);
    `}
`;
const Title = styled.h2`
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
`;
const SubTitle = styled.div`
    overflow: hidden;
`;
const CompanyName = styled.p`
    float: left;
`;
const CreatedDate = styled.p`
    margin: 0;
    margin-bottom: 5px;
    float: right;
`;
const Table = styled.table`
    clear: both;
    width: 100%;
    border-spacing: 0px;
    border-collapse: collapse;
    box-sizing: border-box;
`;
const TableHead = styled.th`
    min-width: 10px;
    padding: 5px;
    background-color: #bec0bf;
    text-align: left;
    border: solid 1px #aaabaa;
`;
const TableHeadRow = styled.tr`
    background-color: #f9f9f9 !important;
    border-top: solid 2px #000;
    border-bottom: solid 1px #000;
    & ~ tr:nth-child(odd) {
        background-color: #f5f5f5;
    }
`;
const Total = styled.div`
    font-weight: bold;
`;
const Tag = styled.div`
    margin-bottom: 10px;
`;
const TableRow = styled.tr`
    border: solid 1px #aaabaa;
`;
const TableColumn = styled.td`
    border: solid 1px #aaabaa;
    padding: 5px;
    border-top: none;
    border-bottom: none;
    ${(props) =>
        props.value &&
        css`
            text-align: right;
        `}
    ${(props) =>
        props.name &&
        css`
            background-color: #dcdcdc;
            font-weight: bold;
        `}
    ${(props) =>
        props.endpoint &&
        css`
            border-right: solid 1px #000;
        `}
`;
const Cautions = styled.div`
    text-align: center;
    margin: 50px 0;
    line-height: 1.6;
    font-size: 14px;
`;
const Footer = styled.h3`
    text-align: center;
    font-size: 24px;
    margin: 0;
`;


export default ({
    onDownload, company = '샌달', created = new Date(),
    dlvCost,
    products = [],
}) => {
    let total = 0;
    let render_total = 0;
    const ref = useRef(null);
    return (
        <ButtonBase style={{ width: '100%', }} onClick={() => onDownload(ref)}>
            <EstimateArea>
                <Estimate view>
                    <Title>견적서</Title>
                    <SubTitle>
                        <CompanyName>업체명: {company}</CompanyName>
                        <CreatedDate>
                            작성일: {dateToYYYYMMDD(created, '/')}
                        </CreatedDate>
                    </SubTitle>
                    <Table id="estimate-table">
                        <colgroup>
                            <col style={{ width: '250px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '50px' }} />
                            <col style={{ width: '100px' }} />
                            <col style={{}} />
                        </colgroup>
                        <thead>
                            <tr>
                                <TableHead>항목</TableHead>
                                <TableHead>추가선택</TableHead>
                                <TableHead>수량</TableHead>
                                <TableHead>가격</TableHead>
                                <TableHead>총액</TableHead>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                const {
                                    item,
                                    options,
                                } = product;
                                const components = options.map((option) => {
                                    const {
                                        option_id: itemId,
                                        option_name,
                                        option_price,
                                    } = option;
                                    total += option_price * item.item_quanity;
                                    return (
                                        <TableRow key={itemId}>
                                            <TableColumn name="true"></TableColumn>
                                            <TableColumn>{option_name}</TableColumn>
                                            <TableColumn>{item.item_quanity}</TableColumn>
                                            <TableColumn>{numberFormat(option_price)}</TableColumn>
                                            <TableColumn value={true}>
                                                {numberFormat(option_price * item.item_quanity)}원
                                            </TableColumn>
                                        </TableRow>
                                    );
                                });
                                total += item.item_price * item.item_quanity;
                                return (
                                    <Fragment key={index}>
                                        <TableHeadRow>
                                            <TableColumn>
                                                <Total>▼ {item.item_name}</Total>
                                            </TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn>{item.item_quanity}</TableColumn>
                                            <TableColumn>{numberFormat(item.item_price)}</TableColumn>
                                            <TableColumn value={true}>
                                                <Total>{numberFormat(item.item_price * item.item_quanity)}원</Total>
                                            </TableColumn>
                                        </TableHeadRow>
                                        {components}
                                    </Fragment>
                                );
                            })}
                            <Fragment>
                                <TableHeadRow>
                                    <TableColumn>
                                        <Tag>배달비:</Tag>
                                        <Total>{dlvCost}</Total>
                                    </TableColumn>
                                    <TableColumn></TableColumn>
                                    <TableColumn></TableColumn>
                                    <TableColumn></TableColumn>
                                    <TableColumn value={true}>
                                        <Tag>합계:</Tag>
                                        <Total>{numberFormat(total + parseInt(dlvCost))}원</Total>
                                    </TableColumn>
                                </TableHeadRow>
                            </Fragment>
                        </tbody>
                    </Table>
                    <Cautions>
                        상기와 같이 견적서를 제출합니다.
                    </Cautions>
                    <Footer>{company} 드림</Footer>
                </Estimate>
                <Estimate id="estimate" ref={ref}>
                <Title>견적서</Title>
                    <SubTitle>
                        <CompanyName>업체명: {company}</CompanyName>
                        <CreatedDate>
                            작성일: {dateToYYYYMMDD(created, '/')}
                        </CreatedDate>
                    </SubTitle>
                    <Table id="estimate-table">
                        <colgroup>
                            <col style={{ width: '250px' }} />
                            <col style={{ width: '150px' }} />
                            <col style={{ width: '50px' }} />
                            <col style={{ width: '100px' }} />
                            <col style={{}} />
                        </colgroup>
                        <thead>
                            <tr>
                                <TableHead>항목</TableHead>
                                <TableHead>추가선택</TableHead>
                                <TableHead>수량</TableHead>
                                <TableHead>가격</TableHead>
                                <TableHead>총액</TableHead>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                const {
                                    item,
                                    options,
                                } = product;
                                const components = options.map((option) => {
                                    const {
                                        option_id: itemId,
                                        option_name,
                                        option_price,
                                    } = option;
                                    render_total += option_price * item.item_quanity;
                                    return (
                                        <TableRow key={itemId}>
                                            <TableColumn name="true"></TableColumn>
                                            <TableColumn>{option_name}</TableColumn>
                                            <TableColumn>{item.item_quanity}</TableColumn>
                                            <TableColumn>{numberFormat(option_price)}</TableColumn>
                                            <TableColumn value={true}>
                                                {numberFormat(option_price * item.item_quanity)}원
                                            </TableColumn>
                                        </TableRow>
                                    );
                                });
                                render_total += item.item_price * item.item_quanity;
                                return (
                                    <Fragment key={index}>
                                        <TableHeadRow>
                                            <TableColumn>
                                                <Total>▼ {item.item_name}</Total>
                                            </TableColumn>
                                            <TableColumn></TableColumn>
                                            <TableColumn>{item.item_quanity}</TableColumn>
                                            <TableColumn>{numberFormat(item.item_price)}</TableColumn>
                                            <TableColumn value={true}>
                                                <Total>{numberFormat(item.item_price * item.item_quanity)}원</Total>
                                            </TableColumn>
                                        </TableHeadRow>
                                        {components}
                                    </Fragment>
                                );
                            })}
                            <Fragment>
                                <TableHeadRow>
                                    <TableColumn>
                                        <Tag>배달비:</Tag>
                                        <Total>{dlvCost}</Total>
                                    </TableColumn>
                                    <TableColumn></TableColumn>
                                    <TableColumn></TableColumn>
                                    <TableColumn></TableColumn>
                                    <TableColumn value={true}>
                                        <Tag>합계:</Tag>
                                        <Total>{numberFormat(render_total + parseInt(dlvCost))}원</Total>
                                    </TableColumn>
                                </TableHeadRow>
                            </Fragment>
                        </tbody>
                    </Table>
                    <Cautions>
                        상기와 같이 견적서를 제출합니다.
                    </Cautions>
                    <Footer>{company} 드림</Footer>
                </Estimate>
            </EstimateArea>
        </ButtonBase>
    );
};
