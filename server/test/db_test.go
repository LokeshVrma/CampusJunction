package test

import (
	"testing"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/stretchr/testify/assert"
)

// Test database connection with SQLite (for testing)
func TestConnectDatabaseWithSQLite(t *testing.T) {
	// Open an in-memory SQLite database
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})

	// Assert database connection is successful
	assert.Nil(t, err, "Expected no error while connecting to SQLite")
	assert.NotNil(t, db, "Database connection should not be nil")

	// Check if we can execute a basic query
	sqlDB, err := db.DB()
	assert.Nil(t, err, "Expected no error while getting SQL database instance")

	err = sqlDB.Ping()
	assert.Nil(t, err, "Should be able to ping the database")
}
