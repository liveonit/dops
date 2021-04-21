dops
====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dops.svg)](https://npmjs.org/package/dops)
[![Downloads/week](https://img.shields.io/npm/dw/dops.svg)](https://npmjs.org/package/dops)
[![License](https://img.shields.io/npm/l/dops.svg)](https://github.com/ibarretorey/dops/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dops
$ dops COMMAND
running command...
$ dops (-v|--version|version)
dops/1.0.5 linux-x64 node-v12.21.0
$ dops --help [COMMAND]
USAGE
  $ dops COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dops autocomplete [SHELL]`](#dops-autocomplete-shell)
* [`dops aws:ec2:ls`](#dops-awsec2ls)
* [`dops aws:lambda:ls`](#dops-awslambdals)
* [`dops aws:profile:config [PROFILE_NAME]`](#dops-awsprofileconfig-profile_name)
* [`dops aws:profile:getAccount`](#dops-awsprofilegetaccount)
* [`dops aws:profile:select`](#dops-awsprofileselect)
* [`dops aws:profile:which`](#dops-awsprofilewhich)
* [`dops aws:sm:ls`](#dops-awssmls)
* [`dops git:fullfetch`](#dops-gitfullfetch)
* [`dops help [COMMAND]`](#dops-help-command)
* [`dops plugins`](#dops-plugins)
* [`dops plugins:inspect PLUGIN...`](#dops-pluginsinspect-plugin)
* [`dops plugins:install PLUGIN...`](#dops-pluginsinstall-plugin)
* [`dops plugins:link PLUGIN`](#dops-pluginslink-plugin)
* [`dops plugins:uninstall PLUGIN...`](#dops-pluginsuninstall-plugin)
* [`dops plugins:update`](#dops-pluginsupdate)

## `dops autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ dops autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ dops autocomplete
  $ dops autocomplete bash
  $ dops autocomplete zsh
  $ dops autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `dops aws:ec2:ls`

List ec2 instances

```
USAGE
  $ dops aws:ec2:ls

OPTIONS
  -f, --format=format  aws list ec2 instances in json or yaml format
  -h, --help           show CLI help
  -r, --region=region  aws list ec2 instances for specific region or all
```

_See code: [src/commands/aws/ec2/ls.ts](https://github.com/ibarretorey/dops/blob/v1.0.5/src/commands/aws/ec2/ls.ts)_

## `dops aws:lambda:ls`

List lambda functions

```
USAGE
  $ dops aws:lambda:ls

OPTIONS
  -f, --format=format  return result in json or yaml format
  -h, --help           show CLI help
  -r, --region=region  aws list lambda functions for specific region or default region
```

_See code: [src/commands/aws/lambda/ls.ts](https://github.com/ibarretorey/dops/blob/v1.0.5/src/commands/aws/lambda/ls.ts)_

## `dops aws:profile:config [PROFILE_NAME]`

Create new profile

```
USAGE
  $ dops aws:profile:config [PROFILE_NAME]

OPTIONS
  -f, --format=format  aws list ec2 instances in json or yaml format
  -h, --help           show CLI help
  -r, --region=region  aws list ec2 instances for specific region or all
```

_See code: [src/commands/aws/profile/config.ts](https://github.com/ibarretorey/dops/blob/v1.0.5/src/commands/aws/profile/config.ts)_

## `dops aws:profile:getAccount`

Get aws account name or alias

```
USAGE
  $ dops aws:profile:getAccount
```

_See code: [src/commands/aws/profile/getAccount.ts](https://github.com/ibarretorey/dops/blob/v1.0.5/src/commands/aws/profile/getAccount.ts)_

## `dops aws:profile:select`

Select aws profile

```
USAGE
  $ dops aws:profile:select
```

_See code: [src/commands/aws/profile/select.ts](https://github.com/ibarretorey/dops/blob/v1.0.5/src/commands/aws/profile/select.ts)_

## `dops aws:profile:which`

Get active profile

```
USAGE
  $ dops aws:profile:which
```

_See code: [src/commands/aws/profile/which.ts](https://github.com/ibarretorey/dops/blob/v1.0.5/src/commands/aws/profile/which.ts)_

## `dops aws:sm:ls`

List secrets

```
USAGE
  $ dops aws:sm:ls

OPTIONS
  -f, --format=format  return result in json or yaml format
  -h, --help           show CLI help
  -r, --region=region  aws list secrets for specific region or all region
```

_See code: [src/commands/aws/sm/ls.ts](https://github.com/ibarretorey/dops/blob/v1.0.5/src/commands/aws/sm/ls.ts)_

## `dops git:fullfetch`

List secrets

```
USAGE
  $ dops git:fullfetch

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/git/fullfetch.ts](https://github.com/ibarretorey/dops/blob/v1.0.5/src/commands/git/fullfetch.ts)_

## `dops help [COMMAND]`

display help for dops

```
USAGE
  $ dops help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `dops plugins`

list installed plugins

```
USAGE
  $ dops plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ dops plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.0/src/commands/plugins/index.ts)_

## `dops plugins:inspect PLUGIN...`

displays installation properties of a plugin

```
USAGE
  $ dops plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] plugin to inspect

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

EXAMPLE
  $ dops plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.0/src/commands/plugins/inspect.ts)_

## `dops plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ dops plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ dops plugins:add

EXAMPLES
  $ dops plugins:install myplugin 
  $ dops plugins:install https://github.com/someuser/someplugin
  $ dops plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.0/src/commands/plugins/install.ts)_

## `dops plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ dops plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' 
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ dops plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.0/src/commands/plugins/link.ts)_

## `dops plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ dops plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ dops plugins:unlink
  $ dops plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.0/src/commands/plugins/uninstall.ts)_

## `dops plugins:update`

update installed plugins

```
USAGE
  $ dops plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.10.0/src/commands/plugins/update.ts)_
<!-- commandsstop -->
