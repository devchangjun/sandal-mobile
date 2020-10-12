import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { dateToYYYYMMDD } from '../../lib/formatter';

const EstimateArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; height: 320px;
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
    text-align: left;
    margin: 0 auto;
    padding: 90px;
    background: #fff;
    /* opacity: 0.4; */
    transform: scale(0.3);
`;
const Title = styled.h2`
    text-align: center;
    font-size: 36px;
    margin-top: 0;
`;
const SubTitle = styled.div`
    overflow: hidden;
`;
const CompanyName = styled.p`
    float: left;
`;
const CreatedDate = styled.p`
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
    background-color: #d3d3d3 !important;
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
    margin: 50px 0;
    line-height: 1.6;
    font-size: 14px;
`;
const Footer = styled.h3`
    text-align: center;
    font-size: 24px;
    margin: 0;
`;

const ref = React.createRef();

export default ({
    onDownload,
    company = '샌달',
    created = new Date(),
    products = [
        {
            id: 101,
            name: 'Andy',
            list: [
                { id: 1, item: '항목 1', name: 'Andy', value: 10 },
                { id: 2, item: '항목 2', name: 'Andy', value: 20 },
                { id: 3, item: '항목 3', name: 'Andy', value: 30 },
                { id: 4, item: '항목 4', name: 'Andy', value: 40 },
                { id: 5, item: '항목 5', name: 'Andy', value: 50 },
            ],
        },
        {
            id: 102,
            name: 'Chloe',
            list: [
                { id: 6, item: '항목 6', name: 'Chloe', value: 5 },
                { id: 7, item: '항목 7', name: 'Chloe', value: 15 },
                { id: 8, item: '항목 8', name: 'Chloe', value: 25 },
                { id: 9, item: '항목 9', name: 'Chloe', value: 35 },
                { id: 10, item: '항목 10', name: 'Chloe', value: 45 },
                { id: 11, item: '', name: '', value: 0 },
                { id: 12, item: '', name: '', value: 0 },
                { id: 13, item: '', name: '', value: 0 },
            ],
        },
    ],
}) => {
    return (
        <EstimateArea onClick={() => onDownload(ref)}>
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
                        <col style={{ width: '100px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '150px' }} />
                        <col style={{ width: '50px' }} />
                        <col style={{ width: '50px' }} />
                        <col style={{}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <TableHead></TableHead>
                            <TableHead>항목</TableHead>
                            <TableHead>이름</TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                            <TableHead>총액</TableHead>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            let totalValue = 0;
                            const {
                                id: productId,
                                name: productName,
                                list,
                            } = product;
                            const components = list.map((listItem) => {
                                const {
                                    id: itemId,
                                    item,
                                    name,
                                    value,
                                } = listItem;
                                totalValue += value;
                                return (
                                    <TableRow key={itemId}>
                                        <TableColumn name="true"></TableColumn>
                                        <TableColumn
                                            name="true"
                                            endpoint={true}
                                        >
                                            {item}
                                        </TableColumn>
                                        <TableColumn>{name}</TableColumn>
                                        <TableColumn></TableColumn>
                                        <TableColumn></TableColumn>
                                        <TableColumn value={true}>
                                            {value}
                                        </TableColumn>
                                    </TableRow>
                                );
                            });
                            return (
                                <Fragment key={productId}>
                                    <TableHeadRow>
                                        <TableColumn>
                                            {index === 0 && <Tag>이름:</Tag>}
                                            <Total>▼ {productName}</Total>
                                        </TableColumn>
                                        <TableColumn></TableColumn>
                                        <TableColumn></TableColumn>
                                        <TableColumn></TableColumn>
                                        <TableColumn></TableColumn>
                                        <TableColumn value={true}>
                                            {index === 0 && <Tag>소계:</Tag>}
                                            <Total>{totalValue}</Total>
                                        </TableColumn>
                                    </TableHeadRow>
                                    {components}
                                </Fragment>
                            );
                        })}
                    </tbody>
                </Table>
                <Cautions>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Cautions>
                <Footer>{company} 드림</Footer>
            </Estimate>
        </EstimateArea>
    );
};
