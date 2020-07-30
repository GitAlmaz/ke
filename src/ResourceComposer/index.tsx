import * as React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'

import { RenderList } from './RenderList'
import { RenderDetail } from './RenderDetail'
import { SideBar, SideBarElement } from '../components/SideBar'
import { mountElement } from '../utils/permissions'

const Resource = ({ name, children }: { name: string; children: JSX.Element }): JSX.Element => {
  return (
    <Switch>
      <Route exact path={`/${name}/`}>
        {children}
      </Route>
    </Switch>
  )
}

const AdminResource = ({
  name,
  admin,
  provider,
  user,
}: {
  name: string
  admin: BaseAdmin
  provider: BaseProvider
  user: any
}): JSX.Element => (
  <Switch>
    <Route exact path={`/${name}/`}>
      <RenderList admin={admin} provider={provider} user={user} />
    </Route>
    <Route exact path={`/${name}/:id`}>
      <RenderDetail name={name} admin={admin} provider={provider} user={user} />
    </Route>
  </Switch>
)

const isAdminResource = (resource: any): boolean => {
  return resource.props.admin !== undefined
}

const ResourceComposer = ({
  children,
  withSideBar = true,
  permissions = [],
}: {
  permissions: string[]
  withSideBar: boolean
  children: JSX.Element[]
}): JSX.Element => {
  const forbiddenResourceElement = <p>Простите, вам сюда нельзя :(</p>
  return (
    <ThemeProvider>
      {withSideBar && (
        <SideBar header="Разделы">
          {React.Children.map(children, (resource: any) => {
            if (isAdminResource(resource)) {
              const adminPermissions = resource.props.admin.permissions
              const element = <SideBarElement resource={resource} />

              return mountElement(permissions, adminPermissions, element) || <></>
            }
            return <></>
          })}
        </SideBar>
      )}
      <Router>
        {React.Children.map(children, (resource: any) => {
          if (isAdminResource(resource)) {
            const adminPermissions = resource.props.admin.permissions

            return mountElement(permissions, adminPermissions, resource) || forbiddenResourceElement
          }
          return resource
        })}
      </Router>
    </ThemeProvider>
  )
}

export { ResourceComposer, Resource, AdminResource }
