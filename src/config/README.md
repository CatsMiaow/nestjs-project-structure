# Config

<https://trilon.io/blog/announcing-nestjs-8-whats-new#template-literal-types-and-configservice>
> With the template literal types now available in TypeScript v4.2, we are able to implement a new infer feature that lets us infer the type of a nested custom configuration object's property, even when using dot notation

Since the `infer` option is non-default and needs to be added each time it is used, we implement it as a default by extending ConfigService in Nest.

See [ConfigService](../common/providers/config.service.ts) of `CommonModule`

## Usage example

See [sample](../sample/controllers/sample.controller.ts#L28-L31) method of `SampleController`

![example](https://user-images.githubusercontent.com/1300172/127599201-8491e7bb-76f3-4dbc-9a62-97b6832bb882.png)
