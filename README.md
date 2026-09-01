# Agent Skills

Project documentation: [English](README.en.md) | [简体中文](README.zh.md)

## Agnir Project Instructions

This Project uses Agnir for durable continuity.

Before doing Project work, treat this repository root as the authorized Project Entry Point. Read top-level `AGNIR.yaml`, then load Current State and Next Actions from the declared locators. Load Decisions and Evidence when relevant. Prefer durable Agnir Project truth over chat history or private Agent memory unless a newer Principal instruction or directly observed current Project fact supersedes it.

When checkpointing, saving progress, or finishing work, reconcile material changes to state, next actions, decisions, and necessary evidence into the locations declared by `AGNIR.yaml`. If durable truth did not materially change, checkpointing is a no-op; do not create evidence or rewrite memory just to record an evaluation.

In repository/VCS context, treat an authorized request to `commit`, `提交`, `提交代码`, or equivalent as a checkpoint boundary: reconcile material Agnir continuity before the commit and prefer Project changes plus Agnir changes in one revision. Treat `commit and push`, `提交推送`, or equivalent as checkpoint + commit + push + verification of the authoritative repository/ref declared by `AGNIR.yaml` when available.

Root `AGENTS.md` is intentionally only a locator to this section; this section is the canonical Agnir activation instruction.
