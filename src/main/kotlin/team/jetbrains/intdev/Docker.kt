package team.jetbrains.intdev

fun docker(image: String, env: Map<String, String> = emptyMap()) = ProcessBuilder(buildList {
    add("docker", "run", "--interactive", "--rm")
    env.forEach { add("-e", "${it.key}=${it.value}") }
    add(image)
})

private fun <T> MutableList<T>.add(vararg elements: T) = addAll(elements)
