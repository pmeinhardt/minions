repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "2.2.0"
    kotlin("plugin.serialization") version "2.2.0"
    application
}

kotlin {
    jvmToolchain(21)
}

application {
    mainClass = "team.jetbrains.intdev.MainKt"
}

dependencies {
    implementation("ai.koog:koog-agents:0.3.0")
}
