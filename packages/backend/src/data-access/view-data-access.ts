import { Application, Request, Response, Express } from 'express';
import { ViewTabInfoType, ViewInfoType, GetViewResponseType } from '@family-views/common';
import * as either from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import lodash = require('lodash');
import { ViewInfo } from '@family-views/common/src/dto/view-info';
import * as t from "io-ts"
import { MarkdownTabInfoType, SystemContentTabInfoType, TabInfoType } from '@family-views/common/src/dto/tab-info';
import { ViewTabIdInfoType, ViewTabInfo } from '@family-views/common/src/dto/view-tab-info';

export default function setupViewDataEndpoints(app:Express) {
    const views:ViewTabIdInfoType[] = [
        {
            ViewInfoId: '1',
            displayName: 'View 1',
            description: 'Something descriptive',
            tabIds: ['1', '3']
        },
        {
            ViewInfoId: '2',
            displayName: 'View 2',
            description: 'Something else',
            tabIds: ['1','2', '4', '5']
        }
    ];

    const tabs:TabInfoType[] = [
        {
            tabInfoId: '1',
            name: 'First tab',
            description: 'This is the first tab',
            markdownContent: '# Hello, *world*!',
            tagType: 'markdown'
        },
        {
            tabInfoId: '2',
            name: 'Second tab',
            description: 'This is the second tab',
            markdownContent: `Just a link: https://reactjs.com.`,
            tagType: 'markdown'
        }
    ]

    const tabInfo3:MarkdownTabInfoType = {
        tabInfoId: '3',
        name: 'Third tab',
        description: 'This is the third tab',
        markdownContent: `A paragraph with *emphasis* and **strong importance**.

        > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
        
        * Lists
        * [ ] todo
        * [x] done
        
        A table:
        
        | a | b |
        | - | - |
        `,
        tagType: 'markdown'
    }

    const tabInfo4:SystemContentTabInfoType = {
        tabInfoId: '4',
        name: 'Schedule',
        description: 'It\'s the fourth one',
        systemContent: 'schedule',
        tagType: 'system'
    }

    const tabInfo5:SystemContentTabInfoType = {
        tabInfoId: '5',
        name: 'Weekday routine',
        description: 'It\'s the routine for weekdays.',
        systemContent: 'weekday-routine',
        tagType: 'system'
    }

    tabs.push(tabInfo3, tabInfo4, tabInfo5)
    
    app.get('/view', (req: Request, res: Response): void => {
        const result:ViewInfoType[] = views.map(viewTabInfo => {
            const info:ViewInfoType = viewTabInfo
            return info
        });
        res.status(200).json({result: result})
    })

    app.get('/view/:viewId', (req: Request, res: Response):void => {
        const result:GetViewResponseType = pipe(
            req.params, 
            (params) => views.find((view:ViewTabIdInfoType) => view.ViewInfoId === params.viewId), 
            (view) => {
                if (view != null) {
                    const viewWithTabs:ViewTabInfoType = {
                        ViewInfoId: view.ViewInfoId,
                        displayName: view.displayName,
                        description: view.description,
                        tabs: []
                    }
                    view.tabIds.forEach(tabId => {
                        const tab = tabs.find(t => t.tabInfoId === tabId)
                        if (!tab) {
                            return either.left(new Error('Not all tabs found'))
                        }
                        viewWithTabs.tabs.push(tab)
                    })
                    return either.right(viewWithTabs)
                }
                return either.left(new Error('View not found'))
            }
            )
        res.send(JSON.stringify(result, null, 4));
    })
}