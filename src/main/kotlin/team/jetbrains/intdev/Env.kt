package team.jetbrains.intdev

fun getenv(name: String): String = System.getenv(name) ?: error("Environment variable '$name' is not set!")
