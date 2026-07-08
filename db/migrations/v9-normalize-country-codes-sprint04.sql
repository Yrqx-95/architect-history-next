-- ============================================================
-- V9: Sprint 04 country_code normalization
-- Scope: high-confidence country_code only after current-state dry-run.
-- Safety: no generic name-token or description-only country inference.
-- Idempotent: updates only rows where country_code IS NULL.
-- Rollback: db/migrations/v9-normalize-country-codes-sprint04-rollback.sql
-- ============================================================

-- No high-confidence country_code changes were available in Sprint 04.
