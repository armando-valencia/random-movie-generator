## PROJECT GOAL

Migrate the existing JavaScript codebase to TypeScript while preserving all
current behavior and core logic. This is a migration and light cleanup,
not a rewrite.

The final result should be a clean, readable React + Vite + TypeScript
codebase with strong, pragmatic typing and minimal unnecessary abstraction.

## NON-GOALS

-   Do not rewrite the application
-   Do not change core logic or behavior
-   Do not introduce new architectural patterns
-   Do not add new runtime dependencies (unless strictly required for TypeScript)
-   Do not overengineer types or abstractions

## TYPESCRIPT MIGRATION RULES

-   Convert all .js/.jsx files to .ts/.tsx where appropriate
-   Integrate TypeScript into the existing Vite setup (do not replace Vite)
-   Add or update tsconfig.json as needed
-   Prefer strict but reasonable TypeScript settings
-   Avoid `any`
-   If a type is unclear, define an explicit interface, type alias, or narrow union
-   Types should reflect real domain data and component props

## TYPING PHILOSOPHY

-   Favor clarity over cleverness
-   Strong types are preferred, but avoid unnecessary generics
-   Avoid deeply nested or conditional types unless clearly justified
-   Keep types close to where they are used when possible
-   The code should feel easier to read after the migration, not harder

## CODE CLEANUP GUIDELINES

-   While migrating, identify components or files that are overly abstracted
    without clear benefit
-   Simplify these cases conservatively
-   Cleanup should be:
    -   Directly related to the TypeScript migration
    -   Obvious and low-risk
    -   Focused on readability and maintainability
-   Do not introduce new patterns, helpers, or abstractions
-   Do not refactor purely for stylistic reasons

## BEHAVIOR PRESERVATION

-   Core functionality must remain the same
-   Data flow, side effects, and outputs must be preserved
-   If logic changes are required for typing, they must be functionally equivalent
-   No user-visible behavior should change

## AGENT USAGE

-   Utilize the agents and skills defined in the /agents directory
-   Refer to ROUTING.md to understand:
    -   Agent responsibilities
    -   Available skills
    -   When each agent should be used
-   Delegate tasks appropriately based on agent specialization

## EXECUTION STRATEGY

-   Work incrementally and deliberately
-   Prefer small, clear diffs over large sweeping changes
-   Keep file structure, imports, and naming consistent unless required for TypeScript
-   Validate the build frequently during the migration

## VALIDATION CHECKLIST

Before considering the task complete, ensure:

-   The project builds successfully using Vite + TypeScript
-   There is no usage of `any` unless explicitly justified and documented
-   All existing functionality behaves the same as before
-   Types are readable, localized, and not over-abstracted
-   The codebase is simpler or clearer than before the migration

## CLARIFICATION RULE

If there is any ambiguity regarding:

-   Intended behavior
-   Data shapes
-   Component responsibility
-   Whether a change might alter logic

Pause and ask questions before implementing.
Do not guess.
