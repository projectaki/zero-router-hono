/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TestImport } from './routes/test'
import { Route as PublicImport } from './routes/_public'
import { Route as AuthImport } from './routes/_auth'
import { Route as TestIndexImport } from './routes/test/index'
import { Route as AuthIndexImport } from './routes/_auth.index'
import { Route as TestTestidImport } from './routes/test/$testid'
import { Route as PublicSigninImport } from './routes/_public.signin'

// Create/Update Routes

const TestRoute = TestImport.update({
  id: '/test',
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const PublicRoute = PublicImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const TestIndexRoute = TestIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => TestRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthRoute,
} as any)

const TestTestidRoute = TestTestidImport.update({
  id: '/$testid',
  path: '/$testid',
  getParentRoute: () => TestRoute,
} as any)

const PublicSigninRoute = PublicSigninImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => PublicRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicImport
      parentRoute: typeof rootRoute
    }
    '/test': {
      id: '/test'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof TestImport
      parentRoute: typeof rootRoute
    }
    '/_public/signin': {
      id: '/_public/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof PublicSigninImport
      parentRoute: typeof PublicImport
    }
    '/test/$testid': {
      id: '/test/$testid'
      path: '/$testid'
      fullPath: '/test/$testid'
      preLoaderRoute: typeof TestTestidImport
      parentRoute: typeof TestImport
    }
    '/_auth/': {
      id: '/_auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthImport
    }
    '/test/': {
      id: '/test/'
      path: '/'
      fullPath: '/test/'
      preLoaderRoute: typeof TestIndexImport
      parentRoute: typeof TestImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthIndexRoute: typeof AuthIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthIndexRoute: AuthIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface PublicRouteChildren {
  PublicSigninRoute: typeof PublicSigninRoute
}

const PublicRouteChildren: PublicRouteChildren = {
  PublicSigninRoute: PublicSigninRoute,
}

const PublicRouteWithChildren =
  PublicRoute._addFileChildren(PublicRouteChildren)

interface TestRouteChildren {
  TestTestidRoute: typeof TestTestidRoute
  TestIndexRoute: typeof TestIndexRoute
}

const TestRouteChildren: TestRouteChildren = {
  TestTestidRoute: TestTestidRoute,
  TestIndexRoute: TestIndexRoute,
}

const TestRouteWithChildren = TestRoute._addFileChildren(TestRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof PublicRouteWithChildren
  '/test': typeof TestRouteWithChildren
  '/signin': typeof PublicSigninRoute
  '/test/$testid': typeof TestTestidRoute
  '/': typeof AuthIndexRoute
  '/test/': typeof TestIndexRoute
}

export interface FileRoutesByTo {
  '': typeof PublicRouteWithChildren
  '/signin': typeof PublicSigninRoute
  '/test/$testid': typeof TestTestidRoute
  '/': typeof AuthIndexRoute
  '/test': typeof TestIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_public': typeof PublicRouteWithChildren
  '/test': typeof TestRouteWithChildren
  '/_public/signin': typeof PublicSigninRoute
  '/test/$testid': typeof TestTestidRoute
  '/_auth/': typeof AuthIndexRoute
  '/test/': typeof TestIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/test' | '/signin' | '/test/$testid' | '/' | '/test/'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/signin' | '/test/$testid' | '/' | '/test'
  id:
    | '__root__'
    | '/_auth'
    | '/_public'
    | '/test'
    | '/_public/signin'
    | '/test/$testid'
    | '/_auth/'
    | '/test/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  PublicRoute: typeof PublicRouteWithChildren
  TestRoute: typeof TestRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  PublicRoute: PublicRouteWithChildren,
  TestRoute: TestRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_public",
        "/test"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/"
      ]
    },
    "/_public": {
      "filePath": "_public.tsx",
      "children": [
        "/_public/signin"
      ]
    },
    "/test": {
      "filePath": "test.tsx",
      "children": [
        "/test/$testid",
        "/test/"
      ]
    },
    "/_public/signin": {
      "filePath": "_public.signin.tsx",
      "parent": "/_public"
    },
    "/test/$testid": {
      "filePath": "test/$testid.tsx",
      "parent": "/test"
    },
    "/_auth/": {
      "filePath": "_auth.index.tsx",
      "parent": "/_auth"
    },
    "/test/": {
      "filePath": "test/index.tsx",
      "parent": "/test"
    }
  }
}
ROUTE_MANIFEST_END */
