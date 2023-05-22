// ---
// handle:
//   breadcrumb: Schema Design
// ---
import {
  Link,
  ProcessList,
  ProcessListHeading,
  ProcessListItem,
} from '@trussworks/react-uswds'

import { Highlight } from '~/components/Highlight'
import { Tab, Tabs } from '~/components/Tabs'

export default function SchemaDocumentation() {
  return (
    <>
      <h1>GCN Unified Schema</h1>
      <p>
        The GCN Unified schema is standardized way of organizing the GCN notices
        data of same properities and units. The notice schema is defined using
        JSON (JavaScript Object Notation), a lightweight data-interchange
        format. A set of core schema is designed as building blocks for new GCN
        Notices.
      </p>
      <p>
        As a GCN Notice producer, you can create your own
        mission/instrument-specific schema. We recommend untilizing a
        combination of structures defined in the set of{' '}
        <Link
          href="https://github.com/nasa-gcn/gcn-schema/tree/main/gcn/notices/core"
          rel="external"
        >
          Core schema
        </Link>{' '}
        and specific properties as needed. Please add your schema our{' '}
        <Link href="https://github.com/nasa-gcn/gcn-schema" rel="external">
          Github repository
        </Link>{' '}
        in a folder under{' '}
        <code>
          gcn/notices/<em>mission</em>/
        </code>
        and submit a pull request for the GCN Team to review. Your pipeline
        should generate JSON files following these schema and send alerts to GCN
        as described in New Notice Producers.
      </p>
      <h2>Getting Started</h2>
      <p>
        The first step is to clone your own copy of the{' '}
        <Link href="https://github.com/nasa-gcn/gcn-schema" rel="external">
          nasa-gcn/gcn-schema
        </Link>{' '}
        repo on github. Run the following commands to get your local setup
        ready.
      </p>
      <Highlight
        language="sh"
        code="git clone https://github.com/nasa-gcn/gcn-schema"
      />
      <Highlight language="sh" code="cd gcn-schema" />
      <Highlight language="sh" code="npm i" />
      <p>
        The structure of the repository allows each producer to make their own
        folder to define schemas on a individual mission level. For example, the
        schema definition for IceCube alerts are located in the directory{' '}
        <code>gcn/notices/icecube/</code>. The naming convention for your new
        schema files should follow the patterns{' '}
        <code>
          <em>SchemaName</em>.schema.json
        </code>{' '}
        for the schema definitions and{' '}
        <code>
          <em>SchemaName[.OptionalAdditionalSpecification]</em>.example.json
        </code>{' '}
        for included examples of implementations of these schemas. The{' '}
        <em>SchemaName</em> and <em>OptionalAdditionalSpecification</em> should
        both use camelCase formatting (anExampleName, YourSchemaName,
        thisIsAlsoValid, etc.). This naming convention allows our{' '}
        {/*TODO: Uncomment once available: <Link href='/schema-browser'>schema browser</Link> */}
        schema-browser to generate pages based directly on the files in the
        latest tag.
      </p>
      <p>
        Once you have your local version set up, you can use the following code
        samples to get started. Notice that the <code>$schema</code> field in
        the example has the same value as the <code>$id</code> field in the
        schema. This is how our validator script knows what schema examples
        should be compared against.
      </p>
      <Tabs>
        <Tab label="Sample.schema.json">
          <Highlight
            language="json"
            code={JSON.stringify(
              {
                $id: 'https://gcn.nasa.gov/schema/gcn/notices/<your mission>/<your schema name>.schema.json',
                $schema: 'https://json-schema.org/draft/2020-12/schema',
                type: 'object',
                title: 'Your Schema Name',
                description: 'A description for your schema',
                properties: {},
              },
              null,
              2
            )}
          />
        </Tab>
        <Tab label="Sample.example.json">
          <Highlight
            language="json"
            code={JSON.stringify(
              {
                $schema:
                  'https://gcn.nasa.gov/schema/gcn/notices/<your mission>/<your schema name>.schema.json',
              },
              null,
              2
            )}
          />
        </Tab>
      </Tabs>
      <h2>Defining Your Structure</h2>
      <p>
        We recommend that you take a look through the{' '}
        {/*TODO: Uncomment once available: <Link href='/schema-browser'>schema browser</Link> */}
        schema-browser to get an idea of what common fields have already been
        defined, as well as the{' '}
        <Link href="https://www.learnjsonschema.com/" rel="external">
          json schema documentation
        </Link>{' '}
        to familiarize yourself with the various keywords and types. A good
        method to start formulating your structure is to think first of your
        data product as JSON. Consider the possible values that your pipelines
        will have for each field. Consider the following example:{' '}
        {/* TODO: Get an example that utilizes core components*/}
        {/* Add another tabbed code view with real samples.
         Use the NPM version which will be added with the browser update */}
      </p>
      <p>
        Defining structures in JSON schema can get confusing, but we are happy
        to help.
      </p>
      <h2>Validation</h2>
      <p>
        We have a validation pre-commit hook set up on this project. When you
        commit your updates, the validator will run to make sure that all of the
        schemas and their respective examples behave as expected. This step also
        checks general formatting using the{' '}
        <Link href="https://prettier.io/">Prettier</Link> formatter. To quickly
        format your code, you can run the following command in the root of your
        local repository. This will format spacing, line-breaks, etc. as needed.
      </p>
      <Highlight language="sh" code="npx prettier -w ." />
      <p>
        Then you can check your schema and example's validation by running the
        next command in the same location.
      </p>
      <Highlight language="sh" code="npm run validate" />
      <h1>Best practices</h1>
      <ProcessList>
        <ProcessListItem>
          <ProcessListHeading type="h3">
            Define allOf or anyOf
          </ProcessListHeading>
          Instructions on how to create multiresolution healpix maps
        </ProcessListItem>
        <ProcessListItem>
          <ProcessListHeading type="h3">
            Handle HEALPix Map and Fits file
          </ProcessListHeading>
          Instructions on how to create multiresolution healpix maps.
          instructions on how to base64 encode fits files and include them in a
          JSON notice. Instructions for decoding base64 encoded fits file string
          (w/ example).
        </ProcessListItem>
        <ProcessListItem>
          <ProcessListHeading type="h3">Best practices</ProcessListHeading>
          Best practices for schema updates (ex. Deprecation of fields that are
          being updated or replaced,)
        </ProcessListItem>
      </ProcessList>
    </>
  )
}
